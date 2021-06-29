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
              { path: '/index/', url: 'index.html', },
              { path: '/about/', url: 'about.html', },
              { path: '/registro/', url: 'registro.html', },
              { path: '/usuario/', url: 'usuario.html', },
              { path: '/pedidos/', url: 'pedidos.html', },
          ]
          // ... other parameters
  });

  var mainView = app.views.create('.view-main');

  var nombre = "";
  var mail = "";
  var local = "";
  var clave = "";
  var db = firebase.firestore();
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
      $$('#IrARegistro').on('click', fnirARegistro);
      $$('#IrAUsuario').on('click', fnirAUsuario);
  })
  $$(document).on('page:init', '.page[data-name="registro"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#registro').on('click', fnRegistrarusuario);

  })
  $$(document).on('page:init', '.page[data-name="usuario"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#IrAPedidos').on('click', fnirAPedidos);

  })
  $$(document).on('page:init', '.page[data-name="pedidos"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized

  })










  function fnirAPedidos() {
      mainView.router.navigate('/pedidos/');
  }

  function fnirARegistro() {

      mainView.router.navigate('/registro/');
  }

  function fnirAUsuario() {

      //   firebase.auth().signInWithEmailAndPassword(mail, clave)
      //       .then((userCredential) => {

      //           var user = userCredential.user;
      //           mainView.router.navigate('/usuario/');
      //           console.log("Anda")
      //       })
      //       .catch((error) => {
      //           var errorCode = error.code;
      //           var errorMessage = error.message;
      //       });
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
              mainView.router.navigate('/index/');
              console.log("crea el usuario")


          })
          .catch(function(error) {
              if (error.code == "auth/email-already-in-use") {
                  console.error("el mail elegido ya esta vinculado a una cuenta");
              }

          });
      //   Ingresando los datos a la base de datos

      var datos = {
          Nombre: nombre,
          Local: local,

      };
      var MiId = mail;
      db.collection("usuarios").doc(MiId).set(datos) //Jorge esto no me crea la coleccion, no se si deberia ponerlo aca
          .then(function(MiVarDeDocRef) { //o ponerlo en el then de arriba del auth
              console.log("Se creo todo bien");
          })
          .catch(function(datosDelError) {
              console.log("Salio todo mal");
          })

  }

  //   cerrar sesion firebase.auth().signOut().then(() => {
  //     // Sign-out successful.
  //   }).catch((error) => {
  //     // An error happened.
  //   });