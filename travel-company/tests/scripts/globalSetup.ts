import seedFixtures from "./seedFixtures";

async function globalSetup() {
  await seedFixtures();
}

export default globalSetup;
