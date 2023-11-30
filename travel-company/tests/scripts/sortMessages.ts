import fs from "fs";
import messages from "../fixtures/automatedMessage";

async function sortMessages() {
  const sorted = messages.sort((a, b) => a.index - b.index);

  fs.writeFile(
    "../fixtures/automatedMessage.json",
    JSON.stringify(sorted),
    (err) => {
      if (err) throw err;
      console.log("Sorted array written to sorted.json");
    }
  );
}

export default sortMessages;
