var form = (function(){
    var formPassword = $('#formPassword'),
        input = $('input'),
        btnSubmit = $('#btnSubmit');
    
    var patterns = {
        strong: /^(?!.* )(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/,
        good: /^(?!.* )(?=.{8,30})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[!@#$&*])(?=.*[a-z]))|((?=.*[!@#$&*])(?=.*[A-Z]))|((?=.*[!@#$&*])(?=.*[0-9]))).*$/,
        notBad: /(?!.* )(?=.{8,30}).*/
    };

    formPassword.on('submit', submitForm);
    input.on('keyup', analyze);

    function submitForm() {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/digest/submit',
            data: $(this).serialize(),
            success: function(response) {
                swal({
                    title: "Saved!",
                    icon: "success",
                    button: "Ok",
                });
                input.val('');
                input.css('border', '1px solid black');
                input.next('.help-block').text('');
                btnSubmit.attr('disabled', true);
            },
            error: function(reject) {
                if(reject.status === 422) {
                    var data = reject.responseJSON;
                    input.css('border', '1px solid red');
                    input.next('.help-block').text(data.password[0]).css('color', 'red');
                }
            }
        });
    }

    function analyze() {
        if(patterns.strong.test(input.val())){
            input.css('border', '1px solid green');
            input.next('.help-block').text('Strong').css('color', 'green');
            btnSubmit.attr('disabled', false);
        } else if(patterns.good.test(input.val())) {
            input.css('border', '1px solid #b3b300')
            input.next('.help-block').text('Good').css('color', '#b3b300');
            btnSubmit.attr('disabled', false);
        } else if(patterns.notBad.test(input.val())) {
            input.css('border', '1px solid orange')
            input.next('.help-block').text('Not Bad').css('color', 'orange');
            btnSubmit.attr('disabled', false);
        } else {
            input.css('border', '1px solid red')
            input.next('.help-block').text('Weak/Invalid').css('color', 'red');
            btnSubmit.attr('disabled', true);
        }
    }

    function suggest() {
        var data = 'test123';
        if(!patterns.strong.test(input.val())){
            console.log('suggest');
        }
    }

})();