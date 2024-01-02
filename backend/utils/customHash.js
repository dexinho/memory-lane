const customHash = (password, email) => {
  let hash = "";

  const generateSalt = () => {
    if ((password + email).length < 20) {
      password += email;
      email += password;
    }

    let salt = email.length * password.length;

    for (let i = 0; i < email.length; i++) {
      let emailChar = email.charCodeAt(i) << 1;

      for (let j = password.length - 1; j > 0; j--) {
        let passChar = password.charCodeAt(i) << 2;
        salt += salt << 3;

        salt += i + passChar + emailChar + j;
      }

      hash += salt.toString(32).at(-1) + emailChar.toString(32).at(0);
    }

    return (salt * salt).toString(16);
  };

  const generateHash = () => {
    for (let i = 0; i < salt.length; i++) {
      if (hash.length < 256) hash += salt.at(i) + i.toString(8) + salt.at(-i);
      else break;
    }

    return hash;
  };

  let salt = generateSalt();

  return generateHash(salt);
};

module.exports = customHash;
