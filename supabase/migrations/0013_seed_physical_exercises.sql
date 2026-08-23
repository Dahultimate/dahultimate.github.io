-- Import initial des exercices de préparation physique (export Excel du
-- club). Pour les deux exercices dont le lien vidéo pointait vers un post
-- Instagram partagé avec un numéro de clip ("Clip 5 https://...", "Clip 8
-- https://..."), seule l'URL a été gardée dans video_url ; le numéro de
-- clip est reporté dans les consignes pour ne pas perdre l'information.
--
-- Fichier à exécuter une seule fois : aucune contrainte d'unicité sur le
-- nom, un second passage créerait des doublons.

insert into public.physical_exercises (name, types, instructions, video_url) values
('Footing', ARRAY['Course']::text[], 'Course légère. Durée à adapter en fonction de vos capacités.', NULL),
('Triangle de la mort', ARRAY['Course','Cardio']::text[], '3 plots disposés à 5/6m en triangle isocèle. Courir d''un plot à l''autre et le toucher avec une main.', NULL),
('Croix de la mort', ARRAY['Course','Cardio']::text[], '5 plots disposés à 5/6m les uns des autres en croix (un plot au milieu). Course avec cuts en repassant toujours par le plot du milieu.', NULL),
('Pyramide de la mort', ARRAY['Course','Cardio']::text[], '5 plots alignés, 5m entre chaque. A partir du milieu, course de 5m a gauche, 10m à droite, 15m à gauche, 20m à droite, 15m à gauche, 10m à droite, 5m à gauche.', NULL),
('VMA 60%', ARRAY['Course','Cardio']::text[], NULL, NULL),
('VMA 80%', ARRAY['Course','Cardio']::text[], NULL, NULL),
('VMA 90%', ARRAY['Course','Cardio']::text[], NULL, NULL),
('VMA 100%', ARRAY['Course','Cardio']::text[], NULL, NULL),
('Course 20m', ARRAY['Course','Cardio']::text[], 'Enchaîner des courses de 20m, à fond.', NULL),
('Mountain climbers', ARRAY['Cardio','Abdos']::text[], 'En position de pompe, gainé. Montées de genoux explosives.', 'https://youtu.be/hq_0YlyfqGM'),
('Chaise', ARRAY['Jambes']::text[], 'Adossé contre un mur, jambes pliées en angle droit.', 'https://youtu.be/O1l1DBqYUfc'),
('Tipping', ARRAY['Jambes','Cardio']::text[], 'Piétiner sur place de façon intense.', 'https://youtu.be/-DLfMgcwNhY'),
('Squats (sautés)', ARRAY['Jambes']::text[], 'Flexion des jambes, le dos reste droit. Sauter, recommencer.', 'https://youtu.be/18WlJ2Df22Q'),
('Demi-squats x3 (sautés)', ARRAY['Jambes']::text[], 'Flexion des jambes à mi hauteur, 3 fois rapidement. Sauter, recommencer.', NULL),
('Fentes (sautées)', ARRAY['Jambes']::text[], 'Un pied en avant, un pied en arrière, plier la jambe avant. Sauter en inversant les jambes, recommencer', 'https://youtube.com/shorts/x6GB7M7IvQQ'),
('Fentes latérales', ARRAY['Jambes']::text[], 'Les jambes écartées, plier une jambe, puis se redresser et plier l''autre jambe.', 'https://youtube.com/shorts/CiOwA7PL6K0'),
('Montées de genoux', ARRAY['Jambes','Cardio']::text[], 'Monter explosivement et en alternance les genoux à la poitrine.', 'https://youtube.com/shorts/yv70ENawuUE'),
('Sauts groupés', ARRAY['Jambes']::text[], 'Sauter en montant les deux genoux en même temps.', 'https://youtu.be/mlF6xqGTWyI'),
('Gainage', ARRAY['Abdos']::text[], 'Tenir allongé, coudes au sol.', 'https://youtube.com/shorts/6OFaz1JK2BE'),
('Gainage dynamique face sol (main puis coude)', ARRAY['Abdos']::text[], 'En position de gainage, passer sur les mains, puis sur les coudes.', 'https://youtu.be/8oR6vzJrtRw?t=4s'),
('Gainage dynamique face sol main levée puis rotation du buste', ARRAY['Abdos']::text[], 'En position de gainage sur le côté, lever un bras puis faire une rotation du buste. Enchaîner avec l''autre main.', 'https://youtu.be/W_XYnOtZFmU?t=13s'),
('Gainage sur le côté', ARRAY['Abdos']::text[], 'Allongé sur le côté, coude au sol, corps gainé.', 'https://youtube.com/shorts/eZQRj1yG-gY'),
('Crunch', ARRAY['Abdos']::text[], 'Assis par terre, mains derrière la tête, genoux pliés. Allonger le torse puis se redresser sans bouger les jambes.', 'https://youtube.com/shorts/kcUipgnZb-k'),
('Abdos essuie glace', ARRAY['Abdos','Dos']::text[], 'Allongé sur le dos, jambes levées et tendues, basculer les jambes de gauche à droite en gardant le tronc fixe.', 'https://youtube.com/shorts/w14VQU7GPhc'),
('V-Ups', ARRAY['Abdos','Dos']::text[], 'Allongé sur le dos, relever simultanément les jambes et le buste pour toucher les pieds avec les mains, formant un "V".', 'https://youtube.com/shorts/saHkR_MvIdA'),
('Gainage dorsal', ARRAY['Dos']::text[], 'Allongé sur le ventre, lever légèrement les bras et les jambes pour renforcer le bas du dos.', NULL),
('Superman', ARRAY['Dos']::text[], 'Extension complète bras/jambes allongé sur le ventre, les lever simultanément pour imiter la position de vol de Superman.', 'https://youtube.com/shorts/KTWWh3GsyYw'),
('Oiseau-chien', ARRAY['Dos']::text[], 'En position quadrupède, étendre un bras et la jambe opposée, maintenir léquilibre.', 'https://youtube.com/shorts/WrXRRsT2bSw'),
('Gainage avec élévation des jambes', ARRAY['Dos']::text[], 'En position de planche, lever alternativement une jambe sans bouger le reste du corps.', NULL),
('Pompes', ARRAY['Bras']::text[], 'En appui sur les mains et les pieds, fléchir les bras pour descendre la poitrine, puis remonter.', 'https://youtube.com/shorts/n8PJC6yo_1o'),
('Pompes bréziliennes', ARRAY['Bras']::text[], 'Variante de pompe avec les hanches relevées et les bras fléchis pour travailler davantage les épaules.', NULL),
('Dips', ARRAY['Bras']::text[], 'Assis en appui sur un support, fléchir les bras pour descendre le corps puis remonter, ciblant les triceps.', 'https://youtube.com/shorts/N3hB8rDErZI'),
('Jumping jacks', ARRAY['Cardio']::text[], 'Sauts sur place en écartant bras et jambes simultanément, puis revenir.', 'https://youtu.be/uLVt6u15L98'),
('Burpees', ARRAY['Cardio']::text[], 'Mouvement complet avec squat, pompe puis saut vertical explosif.', 'https://youtube.com/shorts/gYiE_2BtSTg'),
('Rotation de hanches assis', ARRAY['Mobilité / Plio']::text[], 'Assis au sol, les genoux pliés, faire basculer les jambes de gauche à droite en rotation contrôlée.', 'https://youtu.be/UYdxCQYJzqQ'),
('Jefferson curl', ARRAY['Mobilité / Plio']::text[], 'Debout jambes tendues, descendre lentement vertèbre par vertèbre avec une charge légère, puis remonter.', 'https://youtube.com/shorts/J7FKQLtUFN4'),
('Fente latérales agenouillé', ARRAY['Mobilité / Plio']::text[], 'Un genoux à terre, l''autre jambe écartée sur le coté, position fente latérale. Garder la jambe tendu et s''assoir sur le talon de l''autre jambe, puis remonter. Changer de jambe', 'https://www.instagram.com/reel/DHeLR3JvYmn/'),
('Deep squat', ARRAY['Mobilité / Plio']::text[], 'Démarrage en position squat, descendre jusqu''à poser ses fesses sur ses talons et maintenir la position', 'https://www.instagram.com/reel/DHeLR3JvYmn/'),
('Crossover hokey stop', ARRAY['Mobilité / Plio']::text[], 'Entre 2 plots, déplacement en pas latéraux avec changement d''appuie jambe tendue quand arrivée sur un plot', 'https://www.youtube.com/watch?v=JY-mgxRhqlU'),
('Slalom', ARRAY['Mobilité / Plio']::text[], 'Positionner plusieurs plots de chaque coté d''une ligne imaginaire. En courant, toucher les plots avec la main en se baissant, en contournant par l''extérieur', 'https://www.youtube.com/watch?v=Uc76LkiIDNY'),
('Saut grenouille latéraux', ARRAY['Mobilité / Plio']::text[], 'Descendre à croupi et faire des sauts de grenouilles sur les cotés en restant bas', NULL),
('Fentes sautées', ARRAY['Mobilité / Plio']::text[], 'Se mettre en position basse de fente et sauter sur place sans changer de jambes. Faire des petits sauts. Changer de jambe', NULL),
('Saut latéral cloche pied', ARRAY['Mobilité / Plio']::text[], E'3 plots, Saut à cloche pied d''un plot à l''autre en allant d''abord vers l''avant, puis sur le coté\n\n(Vidéo : Clip 5)', 'https://www.instagram.com/p/DMN3DpNsCPL/'),
('Double saut', ARRAY['Mobilité / Plio']::text[], E'Faire 2 grandes foulées en montant bien les genoux et pour la troisième, faire un saut le plus loin possible avec une seule jambe d''appuie. Changer de jambe\n\n(Vidéo : Clip 8)', 'https://www.instagram.com/p/DMN3DpNsCPL/?img_index=8'),
('Simon', ARRAY['Disque']::text[], E'4 plots de couleurs différentes en carré, 1 plot au milieu.\nUn joueur qui donne une couleur à l''autre et qui y envoie le disque. Repasser par le milieu à chaque fois.', NULL),
('T', ARRAY['Disque']::text[], 'Un joueur qui fait des allers retours droite-gauche. Un joueur qui envoie le disque de chaque côté', NULL),
('Y', ARRAY['Disque']::text[], 'Même chose que le T, mais en partant dans la profondeur.', NULL),
('Carré de passes d''indoor', ARRAY['Disque']::text[], 'Carré de passes d''indoor mais plus rapproché. On ne s''arrête pas de courir', NULL);
