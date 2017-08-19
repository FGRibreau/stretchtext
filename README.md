StretchText
===========

See it in action (french articles):

- [Il décide de réaliser une table démontable en bois de palette en 1 weekend, vous n'imaginerez jamais ce qu'il s'est passé ensuite](http://blog.fgribreau.com/2017/08/il-decide-de-realiser-une-table-a-manger-en-bois-de-palette-en-un-weekend.html)
- [{StretchText} Retour sur ma première soutenance en tant qu'examinateur](http://blog.fgribreau.com/2014/05/fr-stretchtext-retour-sur-ma-premiere.html)

   > Contexte: La rédaction de ce billet à débutée un vendredi soir (le 2 Mai 2014). Au fur et à mesure de l'écriture une idée vieille d'au moins 4 ans m'est revenue. J'ai toujours voulu permettre aux lecteurs de sélectionner le niveau des détails dans mes articles. C'est d'ailleurs ainsi que nous communiquons, nous commençons par aborder une première couche d'information (la surface) pour petit à petit descendre dans les "strates" afin d'être le plus précis et intelligible possible.

   > J'ai donc quitté temporairement l'écriture de ce billet afin de démarrer une autre écriture, celle du code. Après quelques minutes, content d'avoir enfin pu concrétiser ce rêve cette idée. J'ai décidé d'aller lire la définition d'HyperText sur Wikipédia (pourquoi ? Parce que j'avais secrètement nommé ce Proof-of-Concept HyperText). Et c'est à ce moment là que j'ai (re-)découvert le concept de [StretchText](http://en.wikipedia.org/wiki/StretchText). Mince ! Dès 1967 Ted Nelson avait eu l'idée de permettre le zoom-in et zoom-out sur le niveau de détail d'un texte. J'avais donc implémenté StretchText avec 47 ans de retard ! La note de [T. Nelson sur StretchText](http://xanadu.com/XUarchive/htn8.tif) est vraiment passionnante, je voulais aussi utiliser des liens (e.g. soulignés en pointillé) pour étendre et réduire le texte mais par soucis de simplicité et par manque de temps j'ai choisi d'utiliser un "[+]" pour remplacer ce comportement.

## Usage

```html
<div class="menu">
  <!-- will contains sections -->
</div>
<div class="content">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam<p data-stretchtext="(bonus) my life">, quis nostrud exercitation,</span> ullamco laboris nisi ut aliquip ex ea commodo consequat.<span data-stretchtext="(bonus) Plop"> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

  <p>My life bla bla bla Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

  <img data-stretchtext="(bonus) my life" src="https://media.giphy.com/media/48FhEMYGWji8/giphy.gif"/>

  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam<p data-stretchtext="(bonus) my life">, quis nostrud exercitation,</span> ullamco laboris nisi ut aliquip ex ea commodo consequat.<span data-stretchtext="(bonus) Plop"> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>
<script type="text/javascript" src="https://stretchtext.fgribreau.com/dist/stretchtext.js"></script>
<script type="text/javascript">
StretchText({
  // select the article container element
  content: document.querySelector('.content'),
  // select the menu container element
  menu: document.querySelector('.menu')
});
</script>
```
