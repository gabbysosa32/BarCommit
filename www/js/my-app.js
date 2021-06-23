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
      $$('#registro').on('click', fnirALogin)
  })
  $$(document).on('page:init', '.page[data-name="usuario"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#usuarionombre').html(nombre);
  })






  var nombre = "";
  var correo = "";
  var local = "";

  function fnirALogin() {

      mainView.router.navigate('/login/');
  }

  function fnirARegistro() {

      mainView.router.navigate('/registro/');
  }

  function fnirAUsuario() {
      mainView.router.navigate('/usuario/');
  }