async function connect() {
  try {
    const messageObject = {
      type: "OPEN_WALLET",
    };
    await window.postMessage(messageObject, "*");
  } catch (error) {
    throw Error("An error occurred while connecting to wallet: " + error);
  }
}

function getId() {
  try {
    function handleMessage(event) {
      if (event.data.type === "FROM_EXTENSION_ASSET") {
        console.log(`this is data:${event.data.type}`);
      } else {
        console.log(`error incoming`);
      }
    }
    window.addEventListener("message", handleMessage);
    return function removeMessageListener() {
      window.removeEventListener("message", handleMessage);
    };
  } catch (error) {
    throw Error("An error occurred while getting enrollment Id: " + error);
  }
}
function walletAvailablity() {
  try {
    function handleMessage(event) {
      if (event.data.type === "kalp_wallet") {
        console.log(event.data.message);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  } catch (error) {
    throw Error(
      "An error occurred while checking wallet availablity: " + error
    );
  }
}
async function sendTransaction(
  e,
  transactionType,
  channelName,
  chainCodeName,
  transactionName,
  transactionParams
) {
  try {
    if (e) {
      e.preventDefault();
    }
    const newFormData = {
      type: "FORM_DATA",
      transactionType,
      channelName,
      chainCodeName,
      transactionName,
      transactionParams,
    };
    await window.postMessage(newFormData, "*");
  } catch (error) {
    throw Error("An error occurred while sending transaction: " + error);
  }
}
module.exports = { connect, sendTransaction, getId, walletAvailablity };
