// Fake user database

var pltz = [
    { name: 'Home in 5', template: 'homein5@onmachine.org?subject=Home%20in%205&amp;body=Lvoe' },
    { name: 'Running Late', template: 'runninglate@onmachine.org?subject=Running%20late&amp;body=Lvoe' }
];

exports.list = function(req, res){
  res.render('index', { title: 'empltz', pltz: pltz });
};

// exports.load = function(req, res, next){
//   var id = req.params.id;
//   req.plt = pltz[id];
//   if (typeof(id) === 'number') {
//       req.plt.id = id;
//       console.log('HELLO HERE IS THIS THING'+ req.plt.id);    
//   } 
//   if (req.plt) {
//     next();
//   } else {
//       next(new Error('cannot find user ' + id));  
//   }
// };

exports.edit = function(req, res){
    res.render('edit', {
        title: 'Editing user ',
        plt: req.plt
    });
};



// exports.view = function(req, res){
//   res.render('users/view', {
//       title: 'Viewing user ' + req.user.name
//     , user: req.user
//   });
// };
// 


exports.update = function(req, res){
    var plt = req.body.plt;
    console.log(req.plt)
    req.plt.name = plt.name;
    req.plt.template = plt.template;
    res.redirect('back');
};