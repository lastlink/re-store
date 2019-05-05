#!/usr/bin/python
try:

    import nltk
    # import /home/funktech/lib/python3.5/site-packages/nltk
    # nltk.download('punkt')
    # nltk.download('wordnet')
    # not needed and missing
    # nltk.download('WordNetLemmatizer')
    from nltk.stem import WordNetLemmatizer
    # wordnet_lemmatizer = WordNetLemmatizer()

    # print("This line will be printed2.")
    # exit()

    from nltk.corpus import wordnet

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
        # for i in offer:
        #     temp = "".join(i)
        #     offer_updated.append(temp)
        # print(offer_updated)
        cur.execute("SELECT request FROM company")
        cur_req = cur.fetchall()

        # print all the first cell of all the rows
        offer_updated = []

        for row in offer:
            temp = "".join(row)
            result = req_offer_match(temp)

        for row in cur_req:
            temp = "".join(row)
            result = req_offer_match(temp)
        return result

    # request = "looking for flour, cream, eggs, dairy, gasoline"
    # offer = "search gas, pipes, trucks"
    def req_offer_match(request):
        request_list = set(request_offer(request))
        # offer_list = set(request_offer(offer))
        offer_ppl = similar_percent(request_list, request)
        # request_ppl = similar_percent(offer_list, request)
        return offer_ppl

    def offer_req_match(request):
        # request_list = set(request_offer(request))
        offer_list = set(request_offer(request))
        # offer_ppl = similar_percent(request_list, offer)
        request_ppl = similar_percent(offer_list, request)
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
        # final_result = {"match percent":words_percentage}
        final_result.append(words_percentage)
        return final_result

    if __name__ == '__main__':
        print(main())

except Exception as e:
    print("error!")
    print(e)