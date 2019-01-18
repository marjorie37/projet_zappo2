const noValidate = {
  name: "Votre identifiant doit contenir 3 caractères au minimum",
  password:
    "Votre mot de passe doit contenir 6 caractères au minimum dont 1 chiffre",
  confirmPassword: "Vos mots de passe ne sont pas identiques",
  code: "Votre code ne doit contenir que des majuscules et au moins 2 chiffres",
  percentage: "Le pourcentage ne doit contenir que des chiffres (2 maximum)",
  title: "Votre titre doit contenir au moins 5 caractères au minimum",
  description: "Votre produit doit contenir une description",
  ht_price:
    'Le prix doit contenir 1 chiffre au minimum séparé par un "." en cas de nombre à virgule'
};

window.addEventListener(
  "load",
  () => {
    const message = document.getElementById(`messageValidator`);
    const forms = document.getElementsByClassName("form-control");
    Array.from(forms).map(input => {
      input.addEventListener("input", e => {
        const validate = {
          name: el => el.length >= 3,
          description: el => el.length >= 1,
          password: el => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(el),
          email: el => validator.isEmail(el),
          code: el => /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{6,}$/.test(el),
          percentage: el => /^[0-9]{1,2}$/.test(el),
          title: el => el.length >= 5,
          ht_price: el => /^[\.0-9]{1,6}$/.test(el),
          confirmPassword: () => {
            const password = document.getElementById("inputPassword");
            const confirmPassword = document.getElementById(
              "inputConfirmPassword"
            );
            return confirmPassword.value === password.value;
          }
        };
        const result = Object.keys(validate).map(el =>
          el === e.target.name ? validate[el](e.target.value) : false
        );
        result.some(el => el === true)
          ? (message.innerHTML = "")
          : (message.innerHTML = noValidate[e.target.name]);
      });
    });
  },
  false
);
