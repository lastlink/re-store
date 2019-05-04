#!/usr/bin/python
import nltk
nltk.download('WordNetLemmatizer')
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
wordnet_lemmatizer = WordNetLemmatizer()

from nltk.corpus import wordnet
from dbcredentials import user,passwd,db

lemmatizer = WordNetLemmatizer()


import MySQLdb

def main():
    db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                         user=user,         # your username
                         passwd=passwd,  # your password
                         db=db)        # name of the data base

    # you must create a Cursor object. It will let
    #  you execute all the queries you need
    cur = db.cursor()

    # Use all the SQL you like
    cur.execute("SELECT offer FROM company")
    offer = cur.fetchall()
    cur.execute("SELECT offer FROM company")
    cur_req = cur.fetchall()

    # print all the first cell of all the rows
    for row in offer:
        result = req_offer_match(row)
        print(result)
    for row in cur_req:
        result = req_offer_match(row)
        print(result)
    return result

# request = "looking for flour, cream, eggs, dairy, gasoline"
# offer = "search gas, pipes, trucks"
def req_offer_match(request):
    request_list = set(request_offer(request))
    # offer_list = set(request_offer(offer))
    offer_ppl = similar_percent(request_list, request)
    print(offer_ppl)
    # request_ppl = similar_percent(offer_list, request)
    return offer_ppl

def offer_req_match(request):
    # request_list = set(request_offer(request))
    offer_list = set(request_offer(request))
    # offer_ppl = similar_percent(request_list, offer)
    request_ppl = similar_percent(offer_list, request)
    print(request_ppl)
    return request_ppl

def request_offer(sentence):
    sentence_tokens = nltk.word_tokenize(sentence)
    syn = []
    for r in sentence_tokens:
        for synset in wordnet.synsets(r):
            for lemma in synset.lemmas():
                syn.append(lemma.name())
    return syn

def similar_percent(list1, list2):
    count = 0
    similar = []

    for rl in list1:
        for o in nltk.word_tokenize(list2):
            if rl == o:
                count = count + 1
                similar.append(rl)
    words_percentage = len(similar)/len(list2)*100
    final_result = {"match percent":words_percentage}
    return final_result

db.close()
