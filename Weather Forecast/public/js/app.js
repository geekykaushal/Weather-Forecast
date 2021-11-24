const submitBtn = document.querySelector('#submit');
const input = document.querySelector('#search');
submitBtn.addEventListener('click', submitForm);

function submitForm(e){
    const locationAddress = input.value;
    let message = document.getElementById('demo');
    let message1 = document.getElementById('demo1');
    fetch('/weather?address=' + locationAddress).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
               message.textContent = data.error;
            }
            else{
                message1.textContent = data.location;
                message.textContent = data.forecast;
                console.log(data.location);
            }
        })
    })
}

const farnValue = document.getElementById('farn');
const farnBtn = document.getElementById('convert_btn');
const celValueShow = document.getElementById('demo3');
farnBtn.addEventListener('click', convert);

function convert(e){
    e.preventDefault();
    let dataValue = farnValue.value;
    const cel = ((dataValue -32)*5)/9;
    celValueShow.textContent = cel.toFixed(2) + ' degree celsius';

}


