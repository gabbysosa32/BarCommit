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
              { path: '/cartaadmin/', url: 'cartaadmin.html', },
              { path: '/admin/', url: 'admin.html', },
          ]
          // ... other parameters
  });

  var mainView = app.views.create('.view-main');

  var nombre = "";
  var mail = "";
  var local = "";
  var clave = "";
  var categoria = "";
  var nombreprod = "";
  var precioprod = "";
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
      //   $$('#IrAUsuario').on('click', fnirAUsuario);
      $$('#IrAUsuario').on('click', fnirAAdmin);
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
  $$(document).on('page:init', '.page[data-name="admin"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#IrACartaAd').on('click', fnirACartaAd);
  })
  $$(document).on('page:init', '.page[data-name="cartaadmin"]', function(e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      $$('#AgregarCarta').on('click', fnAgregarCarta);
  })






  function fnirAAdmin() {
      mainView.router.navigate('/admin/');
  }

  function fnirACartaAd() {
      mainView.router.navigate('/cartaadmin/');
  }

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
          Estado: 2,

      };

      db.collection("usuarios").doc(mail).set(datos)
          .then(function(MiVarDeDocRef) {
              console.log("Se creo todo bien");
          })
          .catch(function(datosDelError) {
              console.log("Salio todo mal");
          })

  }

  function fnAgregarCarta() {
      categoria = $$('#nat-ad').val();
      nombreprod = $$('#nom-ad').val();
      precioprod = $$('#pre-ad').val();





      var datos2 = {
          Nombre: nombreprod,
          Precio: precioprod,
          Estado: 1,

      };

      db.collection("Carta").doc(categoria).set(datos2)
          .then(function(MiVarDeDocRef) {
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