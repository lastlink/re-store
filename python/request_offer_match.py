import csv
import nltk
# nltk.download('punkt')
# nltk.download('wordnet')
# not needed and missing
# nltk.download('WordNetLemmatizer')
from nltk.stem import WordNetLemmatizer
wordnet_lemmatizer = WordNetLemmatizer()

from nltk.corpus import wordnet
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()

def main():

    offer = ['We have power and space.', 'We have electricity and gas in the pumps.','','','We have a wen 56200i 2000 watt inverter for rent','']
    cur_req = ['We need baking ingredients', '','Looking for refrigerator truck that can bring in milk','', '', 'We are a shelter and need non-perishable food.']
    # print all the first cell of all the rows
    for row in offer:
        result = req_offer_match(row)
    for row in cur_req:
        result = req_offer_match(row)
    return result

# request = "looking for flour, cream, eggs, dairy, gasoline"
# offer = "search gas, pipes, trucks"
def req_offer_match(request):
    request_list = set(request_offer(request))
    # offer_list = set(request_offer(offer))
    offer_ppl = similar_percent(request_list, request)
    # print(offer_ppl)
    # request_ppl = similar_percent(offer_list, request)
    return offer_ppl

def offer_req_match(request):
    # request_list = set(request_offer(request))
    offer_list = set(request_offer(request))
    # offer_ppl = similar_percent(request_list, offer)
    request_ppl = similar_percent(offer_list, request)
    # print(request_ppl)
    return request_ppl

def request_offer(sentence):
    sentence_tokens = nltk.word_tokenize(sentence)
    syn = []
    for r in sentence_tokens:
        for synset in wordnet.synsets(r):
            for lemma in synset.lemmas():
                syn.append(lemma.name())
    return syn
final_result = []
def similar_percent(list1, list2):
    count = 0
    similar = []

    for rl in list1:
        for o in nltk.word_tokenize(list2):
            if rl == o:
                count = count + 1
                similar.append(rl)
    if len(list2) !=0 :
        words_percentage = len(similar)/len(list2)*100
    else:
        words_percentage = 0
    final_result.append(words_percentage)
    return final_result

if __name__ == '__main__':
    print(main())