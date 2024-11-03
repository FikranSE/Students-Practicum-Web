function cekRole(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const userRole = req.session.user.role;
  const allowedAslab = ['/home', ];
  const allowedMhs = ['/home', '/enrollment', '/dashboard'];
  
  const isDetailRoute = req.path.startsWith('/detail-assignment/');
  const isDetailRouteAslab = req.path.startsWith('/all-assignment/');

  if (userRole === 'aslab') {
    if (allowedAslab.includes(req.path || isDetailRouteAslab)) {
      return next();
    } else {
      return res.redirect('/home');
    }
  } else if (userRole === 'mahasiswa') {
    if (allowedMhs.includes(req.path || isDetailRoute)) {
      return next();
    } else {
      return res.redirect('/home');
    }
  } else {
    return res.redirect('/login');
  }
}

module.exports = cekRole;
