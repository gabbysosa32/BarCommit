  // If we need to use custom DOM library, let's save it to $$ variable:
  var $$ = Dom7;

  var app = new Framework7({
      // App root element
      root: '#app',
      // App Name
      name: 'My App',
      // App id
      id: 'com.myapp.test',
      // Enable swipe panel
      panel: {
          swipe: 'left',
      },
      // Add default routes
      routes: [
              { path: '/about/', url: 'about.html', },
              { path: '/login/', url: 'login.html', },
              { path: '/registro/', url: 'registro.html', },
              { path: '/usuario/', url: 'usuario.html', },
          ]
          // ... other parameters
  });

  var mainView = app.views.create('.view-main');

  // Handle Cordova Device Ready Event
  $$(document).on('deviceready', function() {
      console.log("Device is ready!");
  });

  // Option 1. Using one 'page:init' handler for all pages
  $$(document).on('page:init', function(e) {
      // Do something here when page loaded and initialized
      console.log(e);
  })

  // Option 2. Using live 'page:init' event handlers for each page
  $$(document).on('page:init', '.page[data-name="index"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#IrALogin').on('click', fnirALogin);
      $$('#IrARegistro').on('click', fnirARegistro);
  })
  $$(document).on('page:init', '.page[data-name="login"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#IrAUsuario').on('click', fnirAUsuario);
  })
  $$(document).on('page:init', '.page[data-name="registro"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#registro').on('click', fnRegistrarusuario)

  })
  $$(document).on('page:init', '.page[data-name="usuario"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized

  })






  var nombre = "";
  var mail = "";
  var local = "";
  clave = "";

  function fnirALogin() {

      mainView.router.navigate('/login/');
  }

  function fnirARegistro() {

      mainView.router.navigate('/registro/');
  }

  function fnirAUsuario() {
      mainView.router.navigate('/usuario/');
  }

  function fnRegistrarusuario() {
      mail = $$('#registro-email').val();
      local = $$('#registro-local').val();
      nombre = $$('#registro-nombre').val();
      clave = $$('#registro-clave').val();

      // Creacion de usuario -----------------------------------

      firebase.auth().createUserWithEmailAndPassword(mail, clave)
          .then(function() {
              mainView.router.navigate('/login/');

          })
          .catch(function(error) {
              if (error.code == "auth/email-already-in-use") {
                  console.error("el mail elegido ya esta vinculado a una cuenta");
              }

          });

  }

  //   cerrar sesion firebase.auth().signOut().then(() => {
  //     // Sign-out successful.
  //   }).catch((error) => {
  //     // An error happened.
  //   });