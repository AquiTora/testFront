"use strict"

document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    const inpForm = document.getElementById('inpForm');
    const incorrect = document.getElementById('incorrect');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if(error === 0){
            inpForm.classList.add('_sending');
            form.classList.add('_sending');
            let response = await fetch('sendMail.php', {
                method: 'POST',
                body: formData
            });
            if(response.ok){
                let result = await response.json();
                alert(result.message);
                form.reset();
                inpForm.classList.remove('_sending');
                form.classList.remove('_sending');
            }else{
                alert('error sending data ' + response.status);
                inpForm.classList.remove('_sending');
                form.classList.remove('_sending');
            }
        }
    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for(let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            incorrect.style.visibility = 'hidden';
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    incorrect.style.visibility = 'visible';
                    error++;
                }
            }else{
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return !/^\w+([\.-]?\w+)+@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});