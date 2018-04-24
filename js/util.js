/**
 * File Name: util.js
 *
 * Revision History:
 *       Qiao Wang, 2018-04-18 : Created
 */

//IBRAHIM VALIDATIONS START
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
                formatEmail: true
            },
            txtPhone: {
                formatPhone: true
            },
            txtPassword: {
                required: true,
                minlength: 8
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

function doValidate_frmLogin() {
    var form = $("#frmLogin");
    form.validate({
        rules: {
            txtLoginEmail: {
                required: true,
                formatEmail: true
            },
            txtLoginPassword: {
                required: true,
                minlength: 8
            }
        },
        messages: {
            txtLoginEmail: {
                required: "Email is required.",
                formatEmail: "Email must be in the right format. E.g. jsmith@fakeemail.com"
            },
            txtLoginPassword: {
                required: "Password is required",
                minlength: "Password must be at least 8 characters long."
            }
        }
    });
    return form.valid();
}

function doValidate_frmProfile() {
    var form = $("#frmProfile");
    form.validate({
        rules: {
            txtProfileUsername: {
                required: true,
                rangelength: [3, 18]
            },
            txtProfileFullName: {
                rangelength: [5, 25]
            },
            txtProfilePhone: {
                formatPhone: true
            }
        },
        messages: {
            txtProfileUsername: {
                required: "Username is required.",
                rangelength: "Username must be between 3 to 18 characters."
            },
            txtProfileFullName: {
                formatEmail: "Full name must be between 5 to 25 characters."
            },
            txtProfilePhone: {
                formatPhone: "Phone number must be 10 digits and in the right format. E.g. 1231231234, (123)123-1234."
            }
        }
    });
    return form.valid();
}

function doValidate_frmEnterPlanName() {
    var form = $("#frmEnterPlanName");
    form.validate({
        rules: {
            txtPlanName: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            txtPlanName: {
                required: "The Plan Name cannot be empty",
                minlength: "The plan name must be more than 2 characters"
            }
        }
    });
    return form.valid();
}

function doValidate_frmEditPlan() {
    var form = $("#frmEditPlan");
    form.validate({
        rules: {
            txtPlanNameModify: {
                required: true,
                minlength: 2
            },
            txtPlanDateModify: {
                required: true
            }
        },
        messages: {
            txtPlanNameModify: {
                required: "The Plan Name cannot be empty",
                minlength: "The plan name must be more than 2 characters"
            },
            txtPlanDateModify: {
                required: "The date cannot be empty."
            }
        }
    });
    return form.valid();
}

function doValidate_frmStrengthDetail() {
    var form = $("#frmStrengthDetail");
    form.validate({
        rules: {
            txtWeight: {
                required: true,
                min: 0
            },
            txtTimeLength: {
                required: true,
                min: 0
            },
            txtRep: {
                required: true,
                min: 0
            },
            exerciseDate: {
                required: true
            }
        },
        messages: {
            txtWeight: {
                required: "The Weight cannot be empty",
                min: "The Weight have to more than 0."
            },
            txtTimeLength: {
                required: "The Time Length cannot be empty",
                min: "The Time Length have to more than 0."
            },
            txtRep: {
                required: "The Rep cannot be empty",
                min: "The Rep have to more than 0."
            },
            exerciseDate: {
                required: "The workout date cannot be empty."
            }
        }
    });
    return form.valid();
}

function doValidate_frmStrengthDetailModify() {
    var form = $("#frmStrengthDetailModify");
    form.validate({
        rules: {
            txtWeightModify: {
                required: true,
                min: 0
            },
            txtTimeLengthModify: {
                required: true,
                min: 0
            },
            txtRepModify: {
                required: true,
                min: 0
            },
            exerciseDateModify: {
                required: true
            }
        },
        messages: {
            txtWeightModify: {
                required: "The Weight cannot be empty",
                min: "The Weight have to more than 0."
            },
            txtTimeLengthModify: {
                required: "The Time Length cannot be empty",
                min: "The Time Length have to more than 0."
            },
            txtRepModify: {
                required: "The Rep cannot be empty",
                min: "The Rep have to more than 0."
            },
            exerciseDateModify: {
                required: "The workout date cannot be empty."
            }
        }
    });
    return form.valid();
}

    jQuery.validator.addMethod("formatEmail",
        function (value, element) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return this.optional(element) || regex.test(value);
        },
        "Must be a valid email.");

    jQuery.validator.addMethod("formatPhone",
        function (value, element) {
            var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return this.optional(element) || regex.test(value);
        },
        "Please enter a phone number in the right format.");

//IBRAHIM VALIDATION END