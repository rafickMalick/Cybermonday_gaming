// Pages légales — transcrites de reference_v1_pages_legales.dc.html.
// Seul changement : livraison offerte dès 99 € (et non 150 €) pour rester cohérent avec les paliers de la v2.

export interface LegalDoc {
  id: string;
  label: string;
  title: string;
  intro: string;
  sections: { h: string; p: string[] }[];
}

export const LEGAL: LegalDoc[] = [
  {
    "id": "mentions",
    "label": "Mentions légales",
    "title": "Mentions légales",
    "intro": "Informations relatives à l'éditeur et à l'hébergeur du site ovrclk.fr, conformément à la loi pour la confiance dans l'économie numérique (LCEN).",
    "sections": [
      {
        "h": "Éditeur",
        "p": [
          "OVRCLK SAS, au capital de 50 000 €, immatriculée au RCS de Lyon sous le n° 912 345 678. Siège social : 18 quai Rambaud, 69002 Lyon. TVA intracommunautaire : FR 42 912345678.",
          "Directrice de la publication : Léa Marchand, présidente."
        ]
      },
      {
        "h": "Hébergement",
        "p": [
          "Le site est hébergé par un prestataire européen certifié ISO 27001, dont les serveurs sont situés en France."
        ]
      },
      {
        "h": "Propriété intellectuelle",
        "p": [
          "L'ensemble des contenus du site (marques, logos, textes, visuels, code) est la propriété exclusive d'OVRCLK SAS ou de ses partenaires. Toute reproduction sans autorisation écrite est interdite."
        ]
      },
      {
        "h": "Contact",
        "p": [
          "Par e-mail : support@ovrclk.fr. Par courrier : OVRCLK SAS, Service client, 18 quai Rambaud, 69002 Lyon."
        ]
      }
    ]
  },
  {
    "id": "cgv",
    "label": "Conditions générales de vente",
    "title": "Conditions générales de vente",
    "intro": "Les présentes CGV encadrent toute commande passée sur ovrclk.fr par un consommateur résidant en France métropolitaine, en Belgique ou au Luxembourg.",
    "sections": [
      {
        "h": "Prix",
        "p": [
          "Les prix sont indiqués en euros, toutes taxes comprises, hors frais de livraison précisés avant validation. Les prix Cyber Monday sont valables pendant la durée affichée par le compte à rebours et dans la limite des stocks disponibles."
        ]
      },
      {
        "h": "Commande et paiement",
        "p": [
          "La commande est ferme dès la validation du paiement. Nous acceptons la carte bancaire (CB, Visa, Mastercard), PayPal et Apple Pay. Les paiements sont sécurisés par le protocole 3D Secure ; aucune donnée bancaire n'est conservée par OVRCLK."
        ]
      },
      {
        "h": "Livraison",
        "p": [
          "Livraison standard en 48 h ouvrées, offerte dès 99 € d'achat, sinon 6,99 €. Livraison express en 24 h : 9,99 €. Un e-mail de suivi est envoyé à l'expédition."
        ]
      },
      {
        "h": "Droit de rétractation",
        "p": [
          "Tu disposes d'un délai légal de 14 jours à compter de la réception pour te rétracter, étendu commercialement à 30 jours. Le remboursement intervient sous 14 jours après réception du retour, par le moyen de paiement initial."
        ]
      },
      {
        "h": "Garanties légales",
        "p": [
          "Tous nos produits bénéficient de la garantie légale de conformité (2 ans, articles L217-3 et suivants du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil)."
        ]
      },
      {
        "h": "Codes promotionnels et packs",
        "p": [
          "Les remises « Pack Setup », paliers de récompenses et codes issus de la roue sont cumulables entre eux, dans la limite d'un code roue par client. Ils ne sont ni échangeables ni remboursables."
        ]
      },
      {
        "h": "Médiation",
        "p": [
          "En cas de litige non résolu avec notre service client, tu peux recourir gratuitement au médiateur de la consommation dont nous relevons, ou à la plateforme européenne de règlement en ligne des litiges."
        ]
      }
    ]
  },
  {
    "id": "cgu",
    "label": "Conditions d'utilisation",
    "title": "Conditions d'utilisation",
    "intro": "Ces conditions régissent l'accès et l'utilisation du site ovrclk.fr, y compris les mécaniques de jeu promotionnelles.",
    "sections": [
      {
        "h": "Accès au site",
        "p": [
          "Le site est accessible gratuitement à toute personne disposant d'un accès à internet. OVRCLK peut suspendre l'accès pour maintenance sans préavis."
        ]
      },
      {
        "h": "Compte client",
        "p": [
          "Tu es responsable de la confidentialité de tes identifiants. Toute commande passée depuis ton compte est réputée effectuée par toi."
        ]
      },
      {
        "h": "Roue de la chance (Cyber Spin)",
        "p": [
          "Jeu gratuit et sans obligation d'achat, limité à une participation par personne et par foyer pendant l'opération Cyber Monday. Le gain est converti en code promotionnel valable 48 h, non échangeable contre sa valeur en espèces.",
          "Toute tentative de participation multiple ou automatisée entraîne l'annulation des gains."
        ]
      },
      {
        "h": "Avis clients",
        "p": [
          "Les avis sont publiés par des acheteurs vérifiés, sans contrepartie, et modérés selon la norme NF Z74-501. Les avis injurieux ou hors sujet sont refusés."
        ]
      },
      {
        "h": "Responsabilité et droit applicable",
        "p": [
          "OVRCLK ne saurait être tenue responsable d'une indisponibilité temporaire du site. Les présentes conditions sont soumises au droit français."
        ]
      }
    ]
  },
  {
    "id": "privacy",
    "label": "Politique de confidentialité",
    "title": "Politique de confidentialité",
    "intro": "Nous collectons le minimum de données nécessaire pour traiter ta commande et améliorer ton expérience, dans le respect du RGPD.",
    "sections": [
      {
        "h": "Responsable du traitement",
        "p": [
          "OVRCLK SAS, 18 quai Rambaud, 69002 Lyon. Délégué à la protection des données : dpo@ovrclk.fr."
        ]
      },
      {
        "h": "Données collectées",
        "p": [
          "Identité et coordonnées (nom, e-mail, adresse, téléphone), historique de commandes, données de navigation. Les données bancaires sont traitées exclusivement par notre prestataire de paiement certifié PCI-DSS."
        ]
      },
      {
        "h": "Finalités et bases légales",
        "p": [
          "Exécution des commandes et du service après-vente (contrat) ; prévention de la fraude (intérêt légitime) ; newsletters et offres personnalisées (consentement, révocable à tout moment)."
        ]
      },
      {
        "h": "Durées de conservation",
        "p": [
          "Données clients : 3 ans après le dernier achat. Factures : 10 ans (obligation comptable). Cookies : 13 mois maximum."
        ]
      },
      {
        "h": "Destinataires",
        "p": [
          "Nos équipes, transporteurs, prestataire de paiement et hébergeur, strictement pour les besoins du service. Aucune donnée n'est vendue à des tiers."
        ]
      },
      {
        "h": "Tes droits",
        "p": [
          "Tu disposes d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité. Écris à dpo@ovrclk.fr. Tu peux également introduire une réclamation auprès de la CNIL."
        ]
      }
    ]
  },
  {
    "id": "cookies",
    "label": "Politique cookies",
    "title": "Politique cookies",
    "intro": "Les cookies nous aident à faire fonctionner le panier, mesurer l'audience et, avec ton accord, personnaliser les offres.",
    "sections": [
      {
        "h": "Cookies essentiels",
        "p": [
          "Panier, session, sécurité du paiement et mémorisation de tes choix. Ils ne peuvent pas être désactivés."
        ]
      },
      {
        "h": "Mesure d'audience",
        "p": [
          "Statistiques anonymisées de fréquentation, exemptées de consentement selon les recommandations de la CNIL."
        ]
      },
      {
        "h": "Personnalisation et publicité",
        "p": [
          "Déposés uniquement avec ton consentement, pour afficher des offres adaptées sur d'autres sites."
        ]
      },
      {
        "h": "Gérer tes préférences",
        "p": [
          "Tu peux modifier ton choix à tout moment via le lien « Gérer les cookies » en bas de page ou dans les réglages de ton navigateur."
        ]
      }
    ]
  },
  {
    "id": "retours",
    "label": "Retours et garantie",
    "title": "Retours et garantie",
    "intro": "Un produit ne te convient pas ? Tu as 30 jours pour le renvoyer gratuitement.",
    "sections": [
      {
        "h": "Retourner un produit",
        "p": [
          "Depuis ton compte, choisis la commande et imprime l'étiquette prépayée. Dépose le colis en point relais dans les 30 jours suivant la réception."
        ]
      },
      {
        "h": "Remboursement",
        "p": [
          "Dès réception et vérification du produit, le remboursement est effectué sous 14 jours maximum sur le moyen de paiement utilisé."
        ]
      },
      {
        "h": "Garantie 2 ans",
        "p": [
          "En cas de panne, nous procédons à un échange express : le produit de remplacement est expédié dès la prise en charge du retour."
        ]
      },
      {
        "h": "Produits exclus",
        "p": [
          "Les accessoires personnalisés et les produits descellés pour raisons d'hygiène (embouts de casque intra-auriculaires) ne peuvent être repris, sauf défaut."
        ]
      }
    ]
  }
];

export const getLegal = (id: string) => LEGAL.find((d) => d.id === id);
export const LEGAL_UPDATED = "1er septembre 2026";
