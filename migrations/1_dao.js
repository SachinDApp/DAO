const Migrations = artifacts.require("organisation");

module.exports = function (deployer) {
  deployer.deploy(Migrations,"40","3600","3600");
};