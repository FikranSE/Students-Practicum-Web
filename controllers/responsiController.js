const db = require('../models'); 
const { format } = require('date-fns');


exports.detailResponsi = async (req, res) => {
  const { classId, meetingId, responseId } = req.params;
  const userRole = req.session.user.role;
  const userId = req.session.user.id;
  const userName = req.session.user.name;

  try {
    // Fetch class data based on classId
    const kelas = await db.Class.findOne({
      where: { id: classId },
      include: [
        {
          model: db.Meeting,
          where: { id: meetingId },
          required: false,
          include: [
            {
              model: db.Response,
              where: { id: responseId }, // Filter by responseId
              required: false
            }
          ]
        }
      ]
    });

    if (!kelas) {
      return res.status(404).send('Class not found');
    }

    // Fetch responses based on classId and meetingId
    const responses = await db.Response.findAll({
      where: {
        classId: classId,
        meetingId: meetingId
      }
    });

    // Fetch questions based on classId, meetingId, and responseId
    const questions = await db.Question.findAll({
      where: {
        classId: classId,
        meetingId: meetingId,
        responseId: responseId
      }
    });

    // Fetch one response based on responseId
    const response = await db.Response.findOne({
      where: { id: responseId }
    });

    // Fetch answers based on responseId, userId, and questionId
    const answers = await db.Answer.findAll({
      where: {
        responseId: responseId,
        userId: userId
      }
    });

    const formattedDue = format(new Date(response.due), 'dd MMM, HH.mm');
    const duePassed = new Date() > new Date(response.due);

    res.render('user/detailResponsi', { userName, responses, classId, meetingId, userRole, userId, kelas, responseId, questions, response, formattedDue, duePassed, answers });
  } catch (error) {
    console.error('Error fetching class, responses, questions, and response:', error);
    res.status(500).send('Server Error');
  }
};




exports.addResponsi = async (req, res) => {
  const { title, meetingId, classId, due } = req.body;

  try {
    // Create a new responsi record in the database
    const response = await db.Response.create({
      title: title,
      meetingId,
      classId,
      due: new Date(due) // Convert due to a Date object before saving
    });

    // Redirect back to the dashboard or appropriate page
    res.redirect(`/dashboard/${classId}`);
  } catch (error) {
    console.error('Error adding responsi:', error);
    res.status(500).send('Server Error');
  }
};


exports.addResponsiQuestion = async (req, res) => {
  const { responseId, classId, meetingId, questionText } = req.body;

  try {
    await db.Question.create({
      responseId,
      classId,
      meetingId,
      questionText
    });

    res.redirect(`/detailResponsi/${classId}/${meetingId}/${responseId}`);
  } catch (error) {
    console.error('Error adding response:', error);
    res.status(500).send('Server Error');
  }
};


exports.deleteResponsiQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    await db.Question.destroy({ where: { id: id } });
    res.redirect('back');
  } catch (error) {
    console.error('Error deleting Question:', error);
    res.status(500).send('Server Error');
  }
};



exports.deleteResponsi = async (req, res) => {
  const { responseId } = req.params;

  try {
    // Fetch the response to get classId and meetingId for redirection
    const response = await db.Response.findOne({
      where: { id: responseId }
    });

    if (!response) {
      return res.status(404).send('Response not found');
    }

    const { classId, meetingId } = response;

    // Delete the response
    await db.Response.destroy({
      where: { id: responseId }
    });

    // Redirect back to the detailResponsi page
    res.redirect(`/dashboard/${classId}`);
  } catch (error) {
    console.error('Error deleting response:', error);
    res.status(500).send('Server Error');
  }
};


exports.submitAnswer = async (req, res) => {
  const { responseId, classId, meetingId } = req.params;
  const { answerText, questionId } = req.body;
  const userId = req.session.user.id; // Assuming user ID is stored in req.session.user.id

  try {
    const answer = await db.Answer.create({
      answerText,
      responseId,
      classId,
      meetingId,
      userId,
      questionId
    });

    res.redirect(`/detailResponsi/${classId}/${meetingId}/${responseId}`);
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).send('Server Error');
  }
};


exports.deleteSubmitResponsi = async (req, res) => {
  const { answerId } = req.params;
  const { responseId, classId, meetingId } = req.body;

  try {
    // Fetch the answer to get the related responseId, classId, and meetingId
    const answer = await db.Answer.findOne({
      where: { id: answerId }
    });

    if (!answer) {
      return res.status(404).send('Answer not found');
    }

    // Delete the answer
    await db.Answer.destroy({
      where: { id: answerId }
    });

    res.redirect(`/detailResponsi/${classId}/${meetingId}/${responseId}`);
  } catch (error) {
    console.error('Error deleting answer:', error);
    res.status(500).send('Server Error');
  }
};