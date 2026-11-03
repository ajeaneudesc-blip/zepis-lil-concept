"""Génère les 3 e-mails HTML de Zépis Lil (concept, marque fictive).

Tableaux + styles en ligne : le format le mieux rendu par Gmail, Outlook et Apple Mail.
Aucune image : les blocs produits sont dessinés en cellules, ce qui évite les images bloquées.
Lancer : python build.py
"""
from pathlib import Path

TX, MU, BD, SB, WH = "#111111", "#666666", "#DADADA", "#F5F5F5", "#FFFFFF"
FONT = "Poppins, Arial, Helvetica, sans-serif"


def page(title, preheader, body):
    return f"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>{title}</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  body {{ margin:0; padding:0; background:{WH}; }}
  a {{ color:{TX}; }}
  @media (max-width: 620px) {{
    .wrap {{ width:100% !important; }}
    .px {{ padding-left:20px !important; padding-right:20px !important; }}
    .h1 {{ font-size:26px !important; }}
    .stack {{ display:block !important; width:100% !important; padding:0 0 12px 0 !important; }}
  }}
</style>
</head>
<body style="margin:0;padding:0;background:{WH};">
<div style="display:none;max-height:0;overflow:hidden;">{preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:{WH};">
<tr><td align="center" style="padding:24px 0;">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;border:1px solid {BD};background:{WH};">
  <tr><td class="px" style="padding:10px 40px;background:{SB};font-family:{FONT};font-size:12px;line-height:18px;color:{MU};">{preheader}</td></tr>
  <tr><td class="px" style="padding:32px 40px 8px 40px;font-family:{FONT};font-size:18px;font-weight:600;color:{TX};">
    <span style="display:inline-block;width:16px;height:16px;background:{TX};vertical-align:-2px;"></span>&nbsp; Zépis Lil
  </td></tr>
  <tr><td class="px" style="padding:24px 40px 40px 40px;font-family:{FONT};color:{TX};">
{body}
  </td></tr>
  <tr><td class="px" style="padding:24px 40px 32px 40px;background:{SB};font-family:{FONT};font-size:12px;line-height:19px;color:{MU};">
    Zépis Lil est une marque fictive (projet personnel de design de Jean Eudes). Cet e-mail est une maquette : aucune vente réelle.<br>
    <a href="#" style="color:{MU};">Se désinscrire</a> · <a href="#" style="color:{MU};">Préférences</a> · Port-Louis, Maurice
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>
"""


def h1(text):
    return f'<h1 class="h1" style="margin:0 0 16px 0;font-family:{FONT};font-size:32px;line-height:38px;font-weight:600;letter-spacing:-0.5px;color:{TX};">{text}</h1>'


def p(text):
    return f'<p style="margin:0 0 20px 0;font-family:{FONT};font-size:16px;line-height:24px;color:{MU};">{text}</p>'


def button(label, href="https://example.com"):
    return f"""<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;"><tr>
<td style="background:{TX};"><a href="{href}" style="display:inline-block;padding:15px 28px;font-family:{FONT};font-size:16px;font-weight:500;color:{WH};text-decoration:none;">{label}</a></td>
</tr></table>"""


def line(name, detail, price):
    return f"""<tr>
<td width="64" style="padding:12px 0;border-bottom:1px solid {BD};"><div style="width:64px;height:64px;background:{SB};"></div></td>
<td style="padding:12px 16px;border-bottom:1px solid {BD};font-family:{FONT};font-size:14px;line-height:20px;color:{TX};">{name}<br><span style="color:{MU};font-size:13px;">{detail}</span></td>
<td align="right" style="padding:12px 0;white-space:nowrap;border-bottom:1px solid {BD};font-family:{FONT};font-size:14px;color:{TX};">{price}</td>
</tr>"""


def rows(pairs, bold_last=False):
    out = []
    for i, (a, b) in enumerate(pairs):
        w = "600" if bold_last and i == len(pairs) - 1 else "400"
        out.append(f'<tr><td style="padding:6px 0;font-family:{FONT};font-size:14px;color:{MU};">{a}</td>'
                   f'<td align="right" style="padding:6px 0;white-space:nowrap;font-family:{FONT};font-size:14px;font-weight:{w};color:{TX};">{b}</td></tr>')
    return "\n".join(out)


welcome = "\n".join([
    h1("Bienvenue chez Zépis Lil"),
    p("Merci pour votre inscription. Voici votre code pour la première commande :"),
    f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;"><tr>'
    f'<td align="center" style="padding:20px;border:1px dashed {TX};font-family:{FONT};font-size:24px;font-weight:600;letter-spacing:2px;color:{TX};">BIENVENUE10</td></tr></table>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;"><tr>',
    *[f'<td class="stack" width="33%" valign="top" style="padding:0 {6 if i < 2 else 0}px 0 0;">'
      f'<div style="height:120px;background:{SB};border-bottom:4px solid {TX};"></div>'
      f'<p style="margin:8px 0 0 0;font-family:{FONT};font-size:14px;color:{TX};">{n}<br><span style="color:{MU};">{pr}</span></p></td>'
      for i, (n, pr) in enumerate([("Vanille Bourbon", "dès Rs 450"), ("Thé à la vanille", "dès Rs 290"), ("Cari maison", "dès Rs 220")])],
    '</tr></table>',
    button("Découvrir la boutique"),
])

abandoned = "\n".join([
    h1("Vous avez oublié quelque chose"),
    p("Votre panier est gardé 48 h. La livraison est offerte à Maurice dès Rs 1 500."),
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;">',
    line("Gousses de vanille Bourbon", "3 gousses · quantité 1", "Rs 450"),
    line("Thé noir à la vanille", "250 g · quantité 1", "Rs 640"),
    '</table>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">',
    rows([("Sous-total", "Rs 1 090"), ("Livraison", "Rs 150"), ("Total", "Rs 1 240")], bold_last=True),
    '</table>',
    button("Reprendre ma commande"),
])

after = "\n".join([
    h1("Merci pour votre commande"),
    p("Votre colis part sous 24 h ouvrées. Vous recevrez le numéro de suivi par e-mail."),
    f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;background:{SB};"><tr><td style="padding:16px 20px;">'
    f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">'
    + rows([("Commande", "ZL-0001 (exemple)"), ("Livraison", "Maurice, 48 h"), ("Total", "Rs 1 240")], bold_last=True)
    + '</table></td></tr></table>',
    f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;border:1px solid {BD};"><tr><td style="padding:20px;font-family:{FONT};">'
    f'<p style="margin:0 0 6px 0;font-size:12px;letter-spacing:1px;color:{MU};">RECETTE DU MOIS</p>'
    f'<p style="margin:0;font-size:14px;line-height:22px;color:{TX};">Rhum arrangé vanille : 2 gousses fendues, 70 cl de rhum blanc, 4 semaines au repos.</p></td></tr></table>',
    button("Suivre ma commande"),
])

here = Path(__file__).parent
for name, title, pre, body in [
    ("1-bienvenue.html", "Bienvenue chez Zépis Lil", "Votre code -10 % est à l’intérieur.", welcome),
    ("2-panier-abandonne.html", "Votre panier vous attend", "Vos épices vous attendent encore.", abandoned),
    ("3-apres-achat.html", "Merci pour votre commande", "Commande ZL-0001 confirmée (exemple).", after),
]:
    (here / name).write_text(page(title, pre, body), encoding="utf-8")
    print("écrit", name)
