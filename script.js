let balance = 1000; // Số dư mặc định
const balanceDisplay = document.getElementById("balance");

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function placeBet(choice) {
    let betAmount = parseInt(document.getElementById("betAmount").value);
    if (betAmount <= 0 || betAmount > balance) {
        alert("Số tiền cược không hợp lệ!");
        return;
    }

    // Lắc 3 viên xúc xắc
    let dice1 = rollDice();
    let dice2 = rollDice();
    let dice3 = rollDice();
    let total = dice1 + dice2 + dice3;

    // Hiển thị xúc xắc
    document.getElementById("dice1").textContent = getDiceEmoji(dice1);
    document.getElementById("dice2").textContent = getDiceEmoji(dice2);
    document.getElementById("dice3").textContent = getDiceEmoji(dice3);

    // Xác định kết quả tài xỉu
    let resultText = `Tổng: ${total} - `;
    let isWin = false;

    if (total >= 11 && total <= 17) {
        resultText += "Tài";
        isWin = (choice === 'tai');
    } else if (total >= 4 && total <= 10) {
        resultText += "Xỉu";
        isWin = (choice === 'xiu');
    } else {
        resultText += "Bộ ba (Nhà cái thắng)";
        isWin = false;
    }

    document.getElementById("result").textContent = resultText;

    // Cập nhật số dư
    if (isWin) {
        balance += betAmount * 1.9;
        alert("Bạn thắng! 🎉");
    } else {
        balance -= betAmount;
        alert("Bạn thua! 😢");
    }

    balanceDisplay.textContent = balance;

    // Kiểm tra nếu hết tiền
    if (balance <= 0) {
        alert("Bạn đã hết tiền! Game over.");
        balance = 1000; // Reset lại số dư
    }
}

// Hàm chuyển số xúc xắc thành emoji 🎲
function getDiceEmoji(num) {
    const diceEmojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return diceEmojis[num - 1];
}
