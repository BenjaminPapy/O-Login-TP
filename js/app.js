let app = {
    // propriété qui va stocker l'ensemble de mes erreurs
    errors: [],
    init: function() {
        // Ciblage des éléments du DOM
        app.errorsArea = document.getElementById('errors');
        app.loginForm = document.getElementById('login-form');
        app.fields = document.querySelectorAll('.field-input');

        // on récupère un array contenant tous les champs qui ont la classe 'field'
        console.log(app.fields);

        // on peut récupérer le nombre d'item dans cet array
        console.log(app.fields.length);

        // on écoute l'event pour CHAQUE field
        app.fields.forEach(function(field){
            field.addEventListener('blur', app.isInputValid);
        });

        // On souhaite intercepter la soumission du formulaire
        app.loginForm.addEventListener('submit', app.isFormValid);
    },
    // méthode intermédiaire qui récupère le champ concerné
    // et vérifie se validité
    isInputValid: function(evt) {
        //console.log(evt.target);
        let field = evt.target;
        app.checkField(field);
    },
    // méthode de vérification de la validité du formulaire
    isFormValid: function(evt) {
        // première chose a faire a la soumission du form : cleaner les erreurs (dans l'array et dans l'affichage)
        app.clearErrors();
        if(app.hasErrors()) {
            // il faut empecher la soumission classique du formulaire
            // empecher sont comportement par défaut
            evt.preventDefault();
            // on a des erreurs
            console.log('on a des erreurs');
            app.showErrors();
        }
        // si pas d'erreurs, on soumet le formulaire normalement
    },
    // méthode de vérification de la validité des champs du formulaire
    // si les champs sont valides => false
    // si les champs sont invalides => true
    hasErrors: function() {
        let usernameField = document.getElementById('field-username');
        let passwordField = document.getElementById('field-password');

        // permet de vérifier la validité du field "username"
        // si le champ est valide => usernameValid = true
        // si le champ est invalide => usernameValid = false
        let usernameValid = app.checkField(usernameField);
        let passwordValid = app.checkField(passwordField);

        // si les 2 fields sont valides => return false
        // si les 2 fields sont invalides => return true
        // si un des 2 fields sont invalides => return true
        return !usernameValid || !passwordValid;
    },
    // méthode permettant de modifier l'aspect d'un champ en fonction de sa validité
    // elle permet également de retourner un booléen :
    // true => le champ est valide
    // false => le champ est invalide
    checkField: function(field) {

        // on souhaite "réinitialiser" l'attribut class de base sur le champ
        field.className = 'field-input';

        // l'élément field
        console.log(field);
        // la valeur de l'élément field
        console.log(field.value);
        // le nombre de caractères de cette valeur
        console.log(field.value.length);
        if (field.value.length < 3) {
            app.errors.push(field.placeholder + ' doit contenir au moins 3 caractères');
            console.log(app.errors);
            field.classList.add('invalid');
            // return stop l'execution de la méthode
            return false;
        }   
        field.classList.add('valid');
        return true;
    },
    // "nettoie" l'array d'erreur et l'affichage
    clearErrors: function() {
        app.errors = [];
        app.errorsArea.innerHTML = '';
    },
    showErrors: function() {
        // on ajoute les erreurs dans le bloc
        app.errors.forEach(function(error){
        // on crée un nouvel élément
        let errorElement = document.createElement('p');
        // on lui ajoute une class
        errorElement.classList.add('error');
        // on modifie son contenu
        errorElement.textContent = error;
        // on lui ajoute à la zone d'erreurs le nouvel élément crée
        app.errorsArea.appendChild(errorElement);
        });
        // on affiche le bloc d'erreurs
        app.errorsArea.classList.add('visible');
    }
};


document.addEventListener('DOMContentLoaded', app.init);