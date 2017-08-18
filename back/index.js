let bot = {
    top: false,
    back: false,
    left: false,
    right: false,
    bip: false
}

if (isset ($_POST['instruction'])) {
    if ($_POST['instruction'] === 'topgo') {
        bot.top = true;
        return "j'avance";
    }
    if ($_POST['instruction'] === 'topstop') {
        bot.top = false;
        return "stop";
    }
    if ($_POST['instruction'] === 'backgo') {
        bot.back = true;
        return "je recule";
    }
    if ($_POST['instruction'] === 'backstop') {
        bot.back = false;
        return "stop";
    }
    if ($_POST['instruction'] === 'leftgo') {
        bot.left = true;
        return "je tourne a gauche";
    }
    if ($_POST['instruction'] === 'leftstop') {
        bot.left = false;
        return "stop";
    }
    if ($_POST['instruction'] === 'rightgo') {
        bot.right = true;
        return "je tourne a droite";
    }
    if ($_POST['instruction'] === 'rightstop') {
        bot.right = false;
        return "stop";
    }
    if ($_POST['instruction'] === 'bipgo') {
        bot.bip = true;
        return "pouette";
    }
    if ($_POST['instruction'] === 'bipstop') {
        bot.bip = false;
        return "stop";
    }
}
