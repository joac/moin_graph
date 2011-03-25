#!-*- coding:utf8 -*-
from __future__ import with_statement
import pickle
import random
import os
import sys
import pygraphviz as gv
from MoinMoin import wikiutil, user
from MoinMoin.request.request_cli import Request
from MoinMoin.Page import Page, RootPage

def int2hex_color(number):
    """Convierte un numero entero en un string de color valido"""
    hexa = hex(number)[2:8]
    longitud = len(hexa)
    if  longitud < 6:
        hexa = ('0'*(6-longitud))+hexa
    return '#'+hexa



#Agregamos el path al wikiconfig.py de pyar
sys.path.append('/home/www-pyar/moin/share/moin/pyar')

#Path al desposito de Archivos
path ='/home/www-pyar/moin/share/moin/pyar/data/pages'
ignore =[u'ReadWriteGroup',u'AdminGroup',u'BadContent']

#Creamos nuestro request de tipo cliente
request = Request()

#Levantamos todas las paginas existentes en el wiki y las convertimos a wikiname
# FIXME hace que las paginas no se levanten del disco y se use la api de moinmoin


pages = RootPage(request).getPageList(user='', include_underlay=False)


#Quitamos las páginas de usuarios
user_pages = []

for uid in user.getUserList(request):
    name = user.User(request, uid).name
    if Page(request, name).exists():
        user_pages.append(name)

ignore += user_pages

pages = set(pages) - set(ignore)

#creo un diccionario pagina:{hijos}

#nodos = {}
#
#for page in pages:
#    nodos[page] = Page(request, page).getPageLinks(request)
#
#with open('node.dump', 'w') as fh:
#    pickle.dump(nodos, fh)
#

#Iniciamos el Grafico
graph = gv.AGraph(directed=True, splines="true", )

#FIXME agregar progressbar

print "Rellenando nodos"
for page in pages:
    page_utf8 = page.encode('utf8')
    graph.add_node(page_utf8, 
                    shape ='plaintext', 
                    href="http://python.org.ar/pyar/"+page_utf8, 
                    tooltip = "Click para ir a la página"
                    )
    print '.',    
for page in pages:
    links = Page(request, page).getPageLinks(request)
    page = page.encode("utf8")
    color = random.randint(0, 0xffffff)    
    for link in links:
        if link in pages and not (link == u'PyAr' or link.startswith('Category')):
            link = link.encode("utf8")
            graph.add_edge(page, link, color=int2hex_color(color))
    print '.',

    
print "Generando Grafico"

graph.draw("grafo.svg", prog='fdp')


