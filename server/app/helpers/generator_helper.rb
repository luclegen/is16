module GeneratorHelper
  def gen_code(count = 6)
    count.times.map{ Random.rand(10) }.join("")
  end
end