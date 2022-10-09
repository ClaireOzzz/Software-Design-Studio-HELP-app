
class Fuzzer
    def self.num_upper_limit
        100
    end

    def initialize
        @default_input = "The Quick Brown Fox Jumps Over The Lazy Dog"
    end

    # non-printable strings are also printed. May need to modify
    def mutate_string(input=@default_input)
    
        out = input.dup
        n_mutations = 20 # variable number
        mutations = [
            method(:insert),
            method(:delete), 
            method(:trim),
            # method(:slice),
            method(:flip),
            method(:swap)
        ]
        mutations_blank_str = [
            method(:insert), 
        ]


        n_mutations.times do
            if out == ""
                m = mutations_blank_str.sample
            else
                m = mutations.sample
            end
            out = m.call(out)
        end
        out
    end

    def get_random_string()
        length = 10
        out = ""
        length.times do
            out = self.insert(out)
        end
        return out
    end


    # individual Mutations ==============

    def insert(input)
        out = input.dup
        out.insert(rand_index(input), rand_char())  
        out
    end

    def delete(input)
        out = input.dup
        out[rand_index(input)] = ""
        out
    end

    def trim(input)
        out = input.dup
        out[0, rand(0..input.length)]
    end

    def slice(input)
        out = input.dup
        rand_ind = rand(0..rand(0..input.length-1))
        range = rand(rand_ind..input.length)
        out[rand_ind, range]
    end

    def flip(input)
            
        out = input.dup

        ind = rand_index(input)
        char = input[ind]

        flip_bits = 1 << rand(0..7)
        new_ord = (char.ord ^ flip_bits)
        # check for non-printable (outside 32 to 126), comment out if unnecessary
        if new_ord > 126 || new_ord < 32
            new_ord = new_ord % 95 + 32
        end
        
        flipped_char = new_ord.chr
        out[ind] = flipped_char
        out
    end

    def swap(input)
        out = input.dup
        ind1 = rand_index(input)
        ind2 = rand_index(input)
        
        out[ind1], out[ind2] = out[ind2], out[ind1]
        out
    end

    # Helper Functions ==============
    private

    def rand_char
        rand(32..126).chr # ASCII 32 to 126
    end

    def rand_index(input)
        if input == ""
            return 0
        end
        rand (-input.length)..(input.length-1)
    end


end