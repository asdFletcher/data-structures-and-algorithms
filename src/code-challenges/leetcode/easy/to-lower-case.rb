# Implement function ToLowerCase() that has a string parameter str, and returns the same string in lowercase.

# Input: "Hello" # Output: "hello"
# Input: "here" # Output: "here"
# Input: "LOVELY" # Output: "lovely"

# 065 = A
# 090 = Z
# 097 = a
# 122 = z

# 30 min

# @param {String} str
# @return {String}
def to_lower_case(str)
  mapUpperToLower = Hash[('A'..'Z').zip('a'..'z')]
  for i in 0..str.length
    str[i] = mapUpperToLower[str[i]] if mapUpperToLower.include?(str[i])
  end
  str
end

puts to_lower_case("asdfASDF")


