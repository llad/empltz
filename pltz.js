// Fake user database

var pltz = [
    { name: 'Home in 5', template: 'homein5@onmachine.org?subject=Home%20in%205&amp;body=Lvoe' },
    { name: 'Running Late', template: 'runninglate@onmachine.org?subject=Running%20late&amp;body=Lvoe' }
];

exports.list = function(req, res){
  res.render('index', { title: 'empltz', pltz: pltz });
  console.log(pltz[0]);
};

// exports.load = function(req, res, next){
//   var id = req.params.id;
//   req.plt = pltz[id];
//   if (req.plt) {
//     next();
//   } else {
//       next(new Error('cannot find user ' + id));
//       
//   }
// };

exports.edit = function(req, res){
    var id = req.params.id;
    console.log(pltz[id]);
    plt = pltz[id];
    res.render('edit', {
      title: 'Editing user ',
      plt: plt,
      pltz: pltz
      });
};



// exports.view = function(req, res){
//   res.render('users/view', {
//       title: 'Viewing user ' + req.user.name
//     , user: req.user
//   });
// };
// 

// exports.update = function(req, res){
//   // Normally you would handle all kinds of
//   // validation and save back to the db
//   var user = req.body.user;
//   req.user.name = user.name;
//   req.user.email = user.email;
//   res.redirect('back');
// };