/**
 * @author Lexo91
 * @version 1.0
 * @url https://gist.github.com/alexander-schranz/d70b3759857382b99b1a
 * @license https://opensource.org/licenses/MIT
 */

BBLog.handle('add.plugin', {

    id: 'l91-keyboard-navigation',

    name: 'List Keyboard Navigation',

    translations: {
        'en' : {
            'l91.keyboard.list' : 'List keyboard navigation'
        },
        'de' : {
            'l91.keyboard.list' : 'List Tastatur Navigation'
        }
    },

    configFlags: [
        {
            'key': 'l91.keyboard.list',
            'init': 1,
            'handler': function(instance) {
                if (!instance.storage('l91.keyboard.list')) {
                    instance.enableKeyboardList(instance);
                } else {
                    instance.disableKeyboardList(instance);
                }
            }
        }
    ],

    init: function(instance) {
        instance.handleKeyboardList(instance);
    },
    
    domchange: function(instance) {},
    
    enableKeyboardList: function(instance) {
        instance.disableKeyboardList(instance);
        $(document).on('keyup.keyboardlist', function(event) {
            var $activeListElement = $('.box-content li.active');
            if ($activeListElement.length) { // if list exists
                if (event.keyCode === 39 || event.keyCode === 68) { // right arrow or d
                    $activeListElement.next().find('div').first().click();
                } else if (event.keyCode === 37 || event.keyCode === 65) { // left arrow or a
                    $activeListElement.prev().find('div').first().click();
                } else if (event.keyCode === 38 || event.keyCode === 87) { // up arrow or w
                    $activeListElement.prevAll().eq(4).find('div').first().click();
                } else if (event.keyCode === 40 || event.keyCode === 83) { // down arrow or s
                    $activeListElement.nextAll().eq(4).find('div').first().click();
                } else if (event.keyCode === 13) {
                    if ($('.track-button').length) {
                        $('.track-button').click();
                    } else if ($('#dogtags-equip').length) {
                        $('#dogtags-equip').click();
                    }
                }
            }
        });
    },
    
    disableKeyboardList: function(instance) {
        $(document).unbind('keyup.keyboardlist');
    },
    
    handleKeyboardList: function(instance) {
        if (instance.storage('l91.keyboard.list')) {
            instance.enableKeyboardList(instance);
        } else {
            instance.disableKeyboardList(instance);
        }
    }
});
