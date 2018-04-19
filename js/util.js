/**
 * File Name: util.js
 *
 * Revision History:
 *       Qiao Wang, 2018-04-18 : Created
 */

function doValidate_frmAddAccount() {
    var form = $("#frmAddAccount");
    form.validate({
       rules: {
           txtUserName: {
               required: true,
               rangelength: [3, 18]
           },
           txtEmail: {
               required: true,
               uniqueEmail: true,
               formatEmail: true
           },
           txtPhone: {
               formatPhone: true
           },
           txtPassword: {
               required: true,
               minlength: 8,
           },
           txtRePassword: {
               required: true,
               equalTo: "#txtPassword"
           }
       },
        messages: {
            txtUserName: {
                required: "Username is required.",
                rangelength: "Username must be between 3 to 18 characters."
            },
            txtEmail: {
                required: "Email is required.",
                uniqueEmail: "Email address is already registered. Please enter another email address.",
                formatEmail: "Email must be in the right format. E.g. jsmith@fakeemail.com"
            },
            txtPhone: {
                formatPhone: "Phone number must be 10 digits and in the right format. E.g. 1231231234, (123)123-1234."
            },
            txtPassword: {
                required: "Password is required",
                minlength: "Password must be at least 8 characters long."
            },
            txtRePassword: {
                required: "Please re-enter password.",
                equalTo: "Password does not match. Please re-enter."
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("formatPhone",
    function(value, element){
        var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return this.optional(element) || regex.test(value);
    },
    "Please enter a phone number in the right format.");