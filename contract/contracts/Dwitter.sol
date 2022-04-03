//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Dwitter {
    struct User {
        address wallet;
        string name;
        string username;
        string bio;
        string avatar;
    }

    struct Dweet {
        User author;
        string id;
        string content;
        uint256 timestamp;
        string[] images;
        address[] likes;
    }

    Dweet[] public dweets;

    mapping(address => string) public usernames;
    mapping(string => User) public users;

    function signup(
        string memory _username,
        string memory _name,
        string memory _bio,
        string memory _avatar
    ) public {
        require(
            bytes(usernames[msg.sender]).length == 0,
            "You are already registered"
        );
        require(
            users[_username].wallet == address(0),
            "Username already taken"
        );
        users[_username] = User({
            wallet: msg.sender,
            name: _name,
            username: _username,
            bio: _bio,
            avatar: _avatar
        });
        usernames[msg.sender] = _username;
    }

    function addDweet(
        string memory _content,
        string memory _id,
        string[] memory _images
    ) public {
        require(
            bytes(usernames[msg.sender]).length > 0,
            "You must be signed up to post a dweet"
        );
        require(bytes(_content).length > 0, "Content cannot be empty");
        User memory user = users[usernames[msg.sender]];

        Dweet memory _dweet = Dweet({
            author: user,
            id: _id,
            content: _content,
            timestamp: block.timestamp,
            images: _images,
            likes: new address[](0)
        });
        dweets.push(_dweet);
    }

    function getUser(address _wallet) public view returns (User memory) {
        return users[usernames[_wallet]];
    }

    function likeDweet(string memory _id) public {
        require(
            bytes(usernames[msg.sender]).length > 0,
            "You must be signed up to like a dweet"
        );
        require(bytes(_id).length > 0, "Dweet id cannot be empty");
        bool add = true;
        for (uint256 i = 0; i < dweets.length; i++) {
            if (
                (keccak256(abi.encodePacked((dweets[i].id))) ==
                    keccak256(abi.encodePacked((_id))))
            ) {
                for (uint256 j = 0; j < dweets[i].likes.length; j++) {
                    if (dweets[i].likes[j] == msg.sender) {
                        dweets[i].likes[j] = dweets[i].likes[
                            dweets[i].likes.length - 1
                        ];
                        dweets[i].likes.pop();
                        add = false;
                    }
                }
                if (add) {
                    dweets[i].likes.push(msg.sender);
                }
                return;
            }
        }
    }

    function getDweets() public view returns (Dweet[] memory) {
        return dweets;
    }
}
