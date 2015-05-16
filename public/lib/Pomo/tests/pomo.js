var AsyncSpec = require('jasmine-async')(jasmine);

describe('The main Pomo object', function() {
    var async = new AsyncSpec(this);
    beforeEach(function() {
        Pomo.wipe();
    });
    afterEach(function() {
        Pomo.wipe();
    });

    var Pomo = require(__dirname + '/../src/dist/pomo'),
        literal_conf = {
            format: 'po',
            mode: 'literal',
            translation_domain: 'default_domain'
        },
        file_conf = {
            format: 'po',
            mode: 'file',
            translation_domain: 'default_domain'
        };
    var small_po_literal = '\
        #: /path/to/file.php:110 \n\
        msgctxt "some context" \n\
        msgid "" \n\
        "Multi" \n\
        "Line" \n\
        "msgid" \n\
        msgstr "Una cadena de mensaje" \n\
    ';
    Pomo.domain = 'default_domain';
    Pomo.returnStrings = true;
    Pomo.unescapeStrings = true;

    async.it("should be able to parse a string literal", function(done) {
        Pomo.wipe();
        Pomo.load(small_po_literal, literal_conf);
        Pomo.ready(function(){
            var message = Pomo.getText("Multi\nLine\n\msgid\n",{ domain:'default_domain' });
                expect(message).toBe("Una cadena de mensaje");
                done();
        });
    });

    async.it("should be able to parse a file into a Pomo object", function(done){
        Pomo.wipe();
        waitsFor(function() {
            return !Pomo.waiting;
        },'Pomo to parse the literal',1000);

        Pomo.load(__dirname+'/po/minisample.po', file_conf);

        Pomo.ready(function(){
            var message = Pomo.getText("Multi\nLine\n\msgid\n",{ domain:'default_domain' });
                expect(message).toBe("Una cadena de mensaje");
                done();
        });
    });

});