module CryptoHelper
  def encrypt(text)
    cipher = OpenSSL::Cipher.new(ENV['SK_ALG'])
    cipher.encrypt
    cipher.key = Base64.decode64(ENV['SECRET'])
    cipher.iv = Base64.decode64(ENV['VECTOR'])
    Base64.encode64(cipher.update(text) + cipher.final)
  end

  def decrypt(hash)
    decipher = OpenSSL::Cipher.new(ENV['SK_ALG'])
    decipher.decrypt
    decipher.key = Base64.decode64(ENV['SECRET'])
    decipher.iv = Base64.decode64(ENV['VECTOR'])
    decipher.update(Base64.decode64(hash)) + decipher.final
  end
end