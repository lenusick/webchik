function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return str === str.split('').reverse().join('');
}

function checkPalindrome() {
    const input = document.getElementById('inputString').value;
    const result = document.getElementById('result');
    
    if (isPalindrome(input)) {
        result.textContent = "Это палиндром!";
        result.style.color = "green";
        document.getElementById('inputString').style.color = "green";
    } else {
        result.textContent = "Это не палиндром!";
        result.style.color = "red";
        document.getElementById('inputString').style.color = "red";
    }
}