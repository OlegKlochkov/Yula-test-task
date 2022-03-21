const banknoteBlocks = {
    5000 : '<img class="banknote" src="./images/fiveThousand.jpg" alt="5000">',
    2000 : '<img class="banknote" src="./images/twoThousand.jpg" alt="2000">',
    1000 : '<img class="banknote" src="./images/oneThousand.jpg" alt="1000">',
    500 : '<img class="banknote" src="./images/fiveHundred.jpg" alt="500">',
    200 : '<img class="banknote" src="./images/twoHundred.jpg" alt="200">',
    100 : '<img class="banknote" src="./images/oneHundred.jpg" alt="100">'
}

async function makeRequest(){

    const amount = document.getElementById('amountInput').value;
    try {
        const response = await fetch(`http://localhost:5000/getBanknotes/${amount}`, {method : 'GET'});
        response.json().then(data => {generateBanknotes(data);});
    } catch (error) {
        console.log(e);
    }

}

function calculateBanknotes(amount, banknoteValue, banknoteAmount){

    let maxAmount = (amount - amount% banknoteValue)/banknoteValue;
    let possibleAmount = maxAmount > banknoteAmount ? banknoteAmount : maxAmount;
    amount-=banknoteValue*possibleAmount;
    return [amount, [banknoteValue ,possibleAmount]];

}

function generateBanknotes(data){

    let generateArray = [];
    let amount = parseInt(data.amount, 10);
    const banknotes = Object.entries(data.banknotes).sort(banknote=>parseInt(banknote[0],10));
    for(const [key, value] of banknotes){
        let result = calculateBanknotes(amount, parseInt(key, 10), value);
        amount = result[0];
        generateArray.push(result[1]);
    }
    const banknotesDiv = document.getElementById('banknotesDiv');
    banknotesDiv.innerHTML = '';

    if(amount !== 0){
        banknotesDiv.style.flexDirection = 'column';
        banknotesDiv.innerHTML = '<h2>Невозможно собрать нужную сумму</h2>';
        banknotesDiv.innerHTML+= '<img id="sadSmile" src="./images/sadSmile.svg" alt=":(">'
    }else{
        banknotesDiv.style.flexDirection = 'row';
        generateArray = generateArray.filter((element) => element[1]>0);
        generateArray.forEach((banknote) => {
            const block = banknoteBlocks[banknote[0]];
            for(let i = 0; i < banknote[1]; i++){
                banknotesDiv.innerHTML+=block;
            }
        })
    }
}