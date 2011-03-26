#!-*- coding: utf8 -*-
import pickle

class NodeFactory(object):
    child_nodes = {}
    def __init__(self, node_dict):
        self.node_dict = node_dict
        for name in node_dict.keys():
            self.child_nodes[name] = WikiNode(self, name)
        #FIXME esta feo asi!
        self.make_relations()
        #self.calc_weights()

    def make_tree(self):
        nodes = self.child_nodes.values()
        nodes.sort(cmp=lambda x, y: cmp(x.weight, y.weight), reverse=True)
        for child in nodes:
            print child.name, child.weight
        
    def make_relations(self):
        [x.set_childs() for x in self.child_nodes.values()] 
    
    def calc_weights(self):
        [x.update() for x in self.child_nodes.values()]

    def make_recursive_tree(self, node_name=u'Inicio'):
        
         recursive_tree = self.child_nodes[node_name].get_dict()
         return recursive_tree
        

class WikiNode(object):

    def __init__(self, factory, name):
        self.factory = factory
        self.childs = []
        self.name = name
        self.weight = 0
        self.processed = False
    
    def set_childs(self):
        child_list = self.factory.node_dict[self.name]
        for child_name in child_list:
            if self.factory.child_nodes.get(child_name, None):
                self.childs.append(self.factory.child_nodes[child_name])
        

    
    def update(self):
        #calculamos el peso de cada nodo
        
        #cada nodo solo relacionado solo conmigo: +1

        #cada nodo con hijos +3
        for child in self.childs:
            
            if len(child.childs):
                self.weight += 3
            else:
                self.weight += 1
    def get_dict(self):
        self.childs_dict = []
       
        if self.childs and not self.processed:
            self.processed = True
            for child in self.childs:
                self.childs_dict.append(child.get_dict())
            

        adjacents = [a.name.encode("utf-8") for a in self.childs] 
        node_name = self.name.encode("utf-8")
        data_tree = dict(name=node_name, id=node_name, children=self.childs_dict, adjacents=adjacents)
        return data_tree

def get_factory():
    #FIXME node.dump no tiene que estar hardcodeado
    fh = open('node.dump')
    node_dict = pickle.load(fh)
    fh.close()
    node_manager = NodeFactory(node_dict)
    return node_manager
    


if __name__ == "__main__":
    
    import json
    
    fh = open('node.dump')
    node_dict = pickle.load(fh)
    fh.close()
    node_manager = NodeFactory(node_dict)
    fh = open('test.json', 'w')
    json_data= json.dumps(node_manager.make_recursive_tree())
    fh.write("var json = %s" % json_data)
    fh.close()

    





        
