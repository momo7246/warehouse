(function () {
    'use strict';

    angular
        .module('app')
        .factory('EncryptionService', EncryptionService);

    EncryptionService.$inject = ['$rootScope'];
    function EncryptionService($rootScope) {
        var service = {};

        service.Encrypt = Encrypt;
	service.Decrypt = Decrypt;

        return service;
		
        function Encrypt(string) {
	    var encrypted = CryptoJS.AES.encrypt(
                string,
                $rootScope.base64Key,
                { iv: $rootScope.iv });
		
	    return encrypted.ciphertext.toString(CryptoJS.enc.Base64).replace('/','-!-');
        }
	
	function Decrypt(ciphertext) {
	    var realcipher = ciphertext.replace('-!-','/');
	    var cipherParams = CryptoJS.lib.CipherParams.create({
		    ciphertext: CryptoJS.enc.Base64.parse(realcipher)
                }),
		decrypted = CryptoJS.AES.decrypt(
                  cipherParams,
                  $rootScope.base64Key,
                  { iv: $rootScope.iv });
		  
	    return decrypted.toString(CryptoJS.enc.Utf8); 
	}
    };
})();