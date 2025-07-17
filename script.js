const balBtn = document.getElementById("balance");
      const welcomeEle = document.getElementById("welcome-message");
      const withdrawInput = document.getElementById("withdraw");
      const depositInput = document.getElementById("deposit");
      const balResult = document.getElementById("balance-result");
      const hisResult = document.getElementById("history-result");

      const msg = "Welcome To Your Bank Account App";
      let index = 0;

      function display() {
        const showmsg = setInterval(() => {
          welcomeEle.textContent = msg.slice(0, index);
          index++;

          if (index > msg.length) {
            clearInterval(showmsg);
            setTimeout(() => {
              welcomeEle.textContent = "";
              index = 0;
              display();
            }, 30000);
          }
        }, 200);
      }
      display();

      function AccountDetails() {
        let balance = 0;
        const history = [];

        function getBalance() {
          return balance;
        }
        function depositAmount(amount) {
          if (amount > 0) {
            balance += amount;
            history.push(`You Deposited: ${amount}`);
          }
        }

        function withdrawalAmount(amount) {
          if (amount > 0) {
            balance -= amount;
            history.push(`You Withdrew: ${amount}`);
          }
        }

        function getHistory() {
          return history;
        }

        return {
          depositAmount,
          withdrawalAmount,
          getBalance,
          getHistory,
        };
      }

      const account = AccountDetails();

      balBtn.addEventListener("click", () => {
        const deposit = parseFloat(depositInput.value) || 0;
        const withdraw = parseFloat(withdrawInput.value) || 0;

        account.depositAmount(deposit);
        account.withdrawalAmount(withdraw);

        balResult.textContent = `Your balance is: ${account.getBalance()}`;
        document.getElementById("withdraw").value = ""
        document.getElementById("deposit").value = ""
       
        hisResult.innerHTML = ""; 
        const ul = document.createElement("ul");

        account.getHistory().forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });

        hisResult.appendChild(ul);
      });

      document.getElementById("history").addEventListener("click", ()=>{
        hisResult.innerHTML = "";
      })