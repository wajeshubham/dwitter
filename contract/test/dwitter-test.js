const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dwitter", function () {
  it("Dwitter signup flow", async function () {
    const Dwitter = await ethers.getContractFactory("Dwitter");
    const [user1, user2] = await ethers.getSigners();
    const dwitter = await Dwitter.deploy(); // pass arguments for constructor
    await dwitter.deployed();

    console.log("signing up user...");
    await dwitter.signup(
      "johndoe",
      "John",
      "I like sandwich",
      "https://ipfs.infura.io/ipfs/QmWoLNsfn82axMhxCdepeVKiqBnvoTJvJxPLuahJRumzFj"
    );

    const user = await dwitter.users("johndoe");
    expect(user.username).to.equal("johndoe");
    expect(user.name).to.equal("John");
    expect(user.bio).to.equal("I like sandwich");
    expect(user.avatar).to.equal(
      "https://ipfs.infura.io/ipfs/QmWoLNsfn82axMhxCdepeVKiqBnvoTJvJxPLuahJRumzFj"
    );

    console.log("Signup successful!");

    console.log("===========================================================");

    console.log("Getting user...");

    const userFromGetUser = await dwitter.getUser(user1.address);
    expect(userFromGetUser.username).to.equal("johndoe");
    expect(userFromGetUser.name).to.equal("John");
    expect(userFromGetUser.bio).to.equal("I like sandwich");
    expect(userFromGetUser.avatar).to.equal(
      "https://ipfs.infura.io/ipfs/QmWoLNsfn82axMhxCdepeVKiqBnvoTJvJxPLuahJRumzFj"
    );

    console.log("Get user passed!");

    console.log("===========================================================");

    expect(await dwitter.usernames(user1.address)).to.equal("johndoe");

    console.log("Registering with same username...");

    await expect(dwitter.signup("", "", "", "")).to.be.revertedWith(
      "You are already registered"
    );
    console.log("Reverted as expected!");

    console.log("===========================================================");

    console.log("Checking for already used username...");

    await expect(
      dwitter
        .connect(user2)
        .signup(
          "johndoe",
          "John",
          "I like sandwich",
          "https://ipfs.infura.io/ipfs/QmWoLNsfn82axMhxCdepeVKiqBnvoTJvJxPLuahJRumzFj"
        )
    ).to.be.revertedWith("Username already taken");

    console.log("Reverted as expected!");

    console.log("===========================================================");
  });

  it("Dwitter post flow", async function () {
    const Dwitter = await ethers.getContractFactory("Dwitter");
    const [user1] = await ethers.getSigners();
    const dwitter = await Dwitter.deploy(); // pass arguments for constructor

    console.log("signing up user for post upload...");
    await dwitter.signup(
      "johndoe",
      "John",
      "I like sandwich",
      "https://ipfs.infura.io/ipfs/QmWoLNsfn82axMhxCdepeVKiqBnvoTJvJxPLuahJRumzFj"
    );

    const user = await dwitter.users("johndoe");
    expect(user.username).to.equal("johndoe");
    expect(user.name).to.equal("John");
    expect(user.bio).to.equal("I like sandwich");
    expect(user.avatar).to.equal(
      "https://ipfs.infura.io/ipfs/QmWoLNsfn82axMhxCdepeVKiqBnvoTJvJxPLuahJRumzFj"
    );
    console.log("Signup successful!");

    console.log("===========================================================");

    console.log("posting a dweet...");

    await dwitter.addDweet("This is dweet content", "1234", [
      "https://ipfs.infura.io/ipfs/QmWoLNsfn82axMhxCdepeVKiqBnvoTJvJxPLuahJRumzFj",
    ]);

    console.log("Post successful!");

    console.log("===========================================================");

    console.log("getting dweets...");
    const dweets = await dwitter.getDweets();
    expect(dweets[0].content).to.equal("This is dweet content");
    expect(dweets[0].author.wallet).to.equal(user1.address);
    expect(dweets[0].id).to.equal("1234");
    expect(dweets[0].images[0]).to.equal(
      "https://ipfs.infura.io/ipfs/QmWoLNsfn82axMhxCdepeVKiqBnvoTJvJxPLuahJRumzFj"
    );

    console.log("Get dweets passed!");

    console.log("===========================================================");

    console.log("liking a dweet...");
    await dwitter.likeDweet("1234");
    const _dweets = await dwitter.getDweets();
    expect(_dweets[0].likes[0]).to.equal(user1.address);
    console.log("liked successfully!");

    console.log("===========================================================");

    console.log("disliking dweet...");
    await dwitter.likeDweet("1234");
    const _dweets2 = await dwitter.getDweets();
    expect(_dweets2[0].likes.length).to.equal(0);
    console.log("disliked successfully!");

    console.log("===========================================================");
  });
});
