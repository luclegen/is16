module CryptoHelper
  def decrypt(hash)
    decipher = OpenSSL::Cipher.new(ENV['SK_ALG'])
    decipher.decrypt
    decipher.key = Base64.decode64(ENV['SECRET'])
    decipher.iv = Base64.decode64(ENV['VECTOR'])
    decipher.update(Base64.decode64(hash)) + decipher.final
  end
end