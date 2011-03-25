import pickle
import json

def open_pickle():
    FILENAME = 'node.dump'  
    fp = open(FILENAME)
    response = pickle.loads(fp.read())
    fp.close()
    return response

def get_child(name, element):
    response = []
    for i in element:
        response.append(dict(name=unicode(i).encode("utf-8"),
                    id=unicode(i).encode("utf-8")))
    return response

pickle_dict = open_pickle()

childs = []
c = 0
for i in pickle_dict:
    if c == 9: break
    children = get_child(i, pickle_dict[i])
    childs.append(dict(
        name = unicode(i).encode("utf-8"),
        id = unicode(i).encode("utf-8"),
       # children = children
        ))
    c += 1

data = dict(name="PyAr", id="PyAr", children=childs)
print "var json = ", json.dumps(data), ";"
