from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm, mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas as pdf_canvas
from reportlab.platypus import Image as RLImage
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = ROOT / "downloads"
ASSETS = ROOT / "assets"
SITE_ASSETS = ROOT.parent / "dutchdelight-site" / "assets"

PURPLE = colors.HexColor("#4b2358")
LIGHT_PURPLE = colors.HexColor("#cdb5d1")
TEXT = colors.HexColor("#25213d")
LINE = colors.HexColor("#999999")
GOLD = colors.HexColor("#bd8a35")


def styles():
    base = getSampleStyleSheet()
    base["Normal"].fontName = "Helvetica"
    base["Normal"].fontSize = 10
    base["Normal"].Leading = 13
    base["Normal"].textColor = TEXT
    base.add(
        ParagraphStyle(
            name="Small",
            parent=base["Normal"],
            fontSize=8.5,
            leading=10.5,
        )
    )
    base.add(
        ParagraphStyle(
            name="TitleDutch",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=PURPLE,
            alignment=1,
            spaceAfter=8,
        )
    )
    base.add(
        ParagraphStyle(
            name="HeadingDutch",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=15,
            textColor=PURPLE,
            spaceBefore=10,
            spaceAfter=6,
        )
    )
    return base


def draw_header_footer(canvas, doc, title):
    canvas.saveState()
    width, height = canvas._pagesize
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#555555"))
    canvas.drawRightString(width - 18 * mm, height - 12 * mm, "JAM_CO23_EP8_P4-K1_A 1/1")
    canvas.setStrokeColor(LIGHT_PURPLE)
    canvas.setLineWidth(1)
    canvas.line(18 * mm, height - 16 * mm, width - 18 * mm, height - 16 * mm)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.setFillColor(PURPLE)
    canvas.drawString(18 * mm, height - 13 * mm, title)
    canvas.restoreState()


def fit_text(text, max_width, font_size=8, font_name="Helvetica-Bold"):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if stringWidth(candidate, font_name, font_size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def box(canvas, x, y, w, h, text, fill=colors.white, stroke=PURPLE, font_size=8, text_color=TEXT):
    canvas.setFillColor(fill)
    canvas.setStrokeColor(stroke)
    canvas.setLineWidth(1)
    canvas.roundRect(x, y, w, h, 4, stroke=1, fill=1)
    canvas.setFillColor(text_color)
    canvas.setFont("Helvetica-Bold", font_size)
    lines = fit_text(text, w - 8, font_size=font_size)
    total_h = len(lines) * (font_size + 2)
    start_y = y + (h + total_h) / 2 - font_size
    for i, line in enumerate(lines):
        canvas.drawCentredString(x + w / 2, start_y - i * (font_size + 2), line)


def connector(canvas, x1, y1, x2, y2):
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.8)
    canvas.line(x1, y1, x2, y2)


def draw_organogram(canvas, doc):
    draw_header_footer(canvas, doc, "Bijlage 4 Organogram DutchDelight Chocolates")
    width, height = landscape(A4)

    canvas.setFillColor(colors.HexColor("#f7f3f8"))
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setFillColor(colors.white)
    canvas.roundRect(14 * mm, 20 * mm, width - 28 * mm, height - 42 * mm, 8, stroke=0, fill=1)

    canvas.setFont("Helvetica-Bold", 22)
    canvas.setFillColor(PURPLE)
    canvas.drawString(22 * mm, height - 35 * mm, "Organogram DutchDelight Chocolates")

    logo = SITE_ASSETS / "logo-dutchdelight.png"
    if logo.exists():
        canvas.drawImage(str(logo), width - 62 * mm, height - 43 * mm, width=40 * mm, height=25 * mm, preserveAspectRatio=True, mask="auto")

    top_y = height - 62 * mm
    bw = 42 * mm
    bh = 14 * mm
    gap = 9 * mm
    center_x = width / 2

    box(canvas, center_x - 28 * mm, top_y, 56 * mm, 16 * mm, "Directeur", fill=PURPLE, stroke=PURPLE, font_size=10, text_color=colors.white)

    line_y = top_y - 12 * mm
    connector(canvas, center_x, top_y, center_x, line_y)

    support_y = top_y - 34 * mm
    support = [
        ("Financien en administratie", 25 * mm),
        ("HRM", 73 * mm),
        ("Data en analytics", 121 * mm),
        ("Inkoop", 169 * mm),
        ("Productie", 217 * mm),
        ("Distributie en logistiek", 265 * mm),
    ]
    canvas.line(support[0][1] + bw / 2, line_y, support[-1][1] + bw / 2, line_y)
    for label, x in support:
        connector(canvas, x + bw / 2, line_y, x + bw / 2, support_y + bh)
        box(canvas, x, support_y, bw, bh, label, fill=colors.HexColor("#efe5f1"), stroke=LIGHT_PURPLE, font_size=7.6)

    manager_y = support_y - 36 * mm
    marketing_x = 70 * mm
    sales_x = 185 * mm
    box(canvas, marketing_x, manager_y, 56 * mm, 15 * mm, "Marketingmanager", fill=LIGHT_PURPLE, stroke=PURPLE, font_size=9)
    box(canvas, sales_x, manager_y, 56 * mm, 15 * mm, "Salesmanager", fill=LIGHT_PURPLE, stroke=PURPLE, font_size=9)
    connector(canvas, center_x, line_y, marketing_x + 28 * mm, manager_y + 15 * mm)
    connector(canvas, center_x, line_y, sales_x + 28 * mm, manager_y + 15 * mm)

    team_y = manager_y - 34 * mm
    team_bw = 45 * mm
    team_bh = 13 * mm

    marketing_team = [
        ("Marketing en communicatie", 25 * mm),
        ("Ontwerp en verpakking", 75 * mm),
        ("Brandmanager", 125 * mm),
    ]
    sales_team = [
        ("Sales support", 168 * mm),
        ("Klantcontact", 218 * mm),
        ("Verkoop groothandel", 268 * mm),
    ]
    for label, x in marketing_team:
        connector(canvas, marketing_x + 28 * mm, manager_y, x + team_bw / 2, team_y + team_bh)
        box(canvas, x, team_y, team_bw, team_bh, label, fill=colors.white, stroke=LIGHT_PURPLE, font_size=7.4)
    for label, x in sales_team:
        connector(canvas, sales_x + 28 * mm, manager_y, x + team_bw / 2, team_y + team_bh)
        box(canvas, x, team_y, team_bw, team_bh, label, fill=colors.white, stroke=LIGHT_PURPLE, font_size=7.4)

    sales_sub_y = team_y - 25 * mm
    sales_sub = [
        ("Speciaalzaken", 168 * mm),
        ("Horeca en retail", 218 * mm),
        ("Key accounts", 268 * mm),
    ]
    for label, x in sales_sub:
        connector(canvas, sales_x + 28 * mm, manager_y, x + team_bw / 2, sales_sub_y + team_bh)
        box(canvas, x, sales_sub_y, team_bw, team_bh, label, fill=colors.HexColor("#fbf7ef"), stroke=GOLD, font_size=7.4)

    canvas.setFont("Helvetica", 8.5)
    canvas.setFillColor(colors.HexColor("#666666"))
    canvas.drawString(22 * mm, 18 * mm, "Gebruik dit organogram bij het bepalen van taakverdeling, interne afstemming en verkoopondersteuning voor DolceDistribuzione.")


def create_organogram_pdf():
    png = DOWNLOADS / "Bijlage 4 Organogram DutchDelight Chocolates.png"
    out = DOWNLOADS / "Bijlage 4 Organogram DutchDelight Chocolates.pdf"
    render_organogram_visual(png)
    canvas = pdf_canvas.Canvas(str(out), pagesize=landscape(A4))
    width, height = landscape(A4)
    canvas.drawImage(str(png), 0, 0, width=width, height=height, preserveAspectRatio=False, mask="auto")
    canvas.showPage()
    canvas.save()
    return out


def font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\calibrib.ttf" if bold else r"C:\Windows\Fonts\calibri.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def draw_centered_text(draw, xy, text, fnt, fill, max_width, line_gap=5):
    x, y, w, h = xy
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=fnt) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)

    line_heights = []
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=fnt)
        line_heights.append(bbox[3] - bbox[1])
    total_height = sum(line_heights) + line_gap * (len(lines) - 1)
    yy = y + (h - total_height) / 2
    for line, line_height in zip(lines, line_heights):
        tw = draw.textlength(line, font=fnt)
        draw.text((x + (w - tw) / 2, yy), line, font=fnt, fill=fill)
        yy += line_height + line_gap


def draw_wrapped_text(draw, x, y, text, fnt, fill, max_width, line_gap=7):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=fnt) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)

    yy = y
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=fnt)
        draw.text((x, yy), line, font=fnt, fill=fill)
        yy += (bbox[3] - bbox[1]) + line_gap
    return yy


def draw_visual_box(draw, xy, label, fill, outline, text_fill, radius=24, title=False):
    x, y, w, h = xy
    shadow = (0, 0, 0, 22)
    draw.rounded_rectangle((x + 8, y + 10, x + w + 8, y + h + 10), radius=radius, fill=shadow)
    draw.rounded_rectangle((x, y, x + w, y + h), radius=radius, fill=fill, outline=outline, width=4)
    draw_centered_text(draw, (x + 20, y + 10, w - 40, h - 20), label, font(37 if title else 29, bold=True), text_fill, w - 48)


def draw_line(draw, start, end, fill, width=7):
    draw.line((start[0], start[1], end[0], end[1]), fill=fill, width=width)


def render_organogram_visual(path):
    w, h = 3508, 2480
    img = Image.new("RGBA", (w, h), "#f7f3f8")
    draw = ImageDraw.Draw(img, "RGBA")

    purple = "#4b2358"
    purple_2 = "#6b3c73"
    lilac = "#d9c5de"
    lilac_light = "#f0e7f2"
    gold = "#bd8a35"
    gold_light = "#fbf3e3"
    green = "#3e7f72"
    green_light = "#e4f0ec"
    ink = "#25213d"
    line = "#9c8aa2"

    draw.rounded_rectangle((150, 150, w - 150, h - 150), radius=42, fill="#ffffff")
    draw.rectangle((150, 150, w - 150, 470), fill="#efe5f1")
    draw.rounded_rectangle((150, 150, w - 150, h - 150), radius=42, outline="#d4c3d8", width=4)

    draw.text((250, 235), "Bijlage 4", font=font(38, bold=True), fill=purple)
    draw.text((250, 300), "Organogram DutchDelight Chocolates", font=font(86, bold=True), fill=purple)

    logo_path = SITE_ASSETS / "logo-dutchdelight.png"
    if logo_path.exists():
        logo = Image.open(logo_path).convert("RGBA")
        logo.thumbnail((470, 220))
        logo_bg = Image.new("RGBA", (520, 250), (255, 255, 255, 230))
        logo_bg.alpha_composite(logo, ((520 - logo.width) // 2, (250 - logo.height) // 2))
        img.alpha_composite(logo_bg, (w - 750, 205))

    director = (1454, 600, 600, 150)
    draw_visual_box(draw, director, "Directeur", purple, purple, "#ffffff", radius=30, title=True)

    split_y = 870
    direct_y = 990
    direct_w, direct_h = 345, 122
    start_x, gap = 210, 58
    direct_reports = [
        ("Financien en administratie", start_x + 0 * (direct_w + gap), lilac_light, purple),
        ("HRM", start_x + 1 * (direct_w + gap), lilac_light, purple),
        ("Inkoop", start_x + 2 * (direct_w + gap), lilac_light, purple),
        ("Productie", start_x + 3 * (direct_w + gap), lilac_light, purple),
        ("Distributie en logistiek", start_x + 4 * (direct_w + gap), lilac_light, purple),
        ("Marketingmanager", start_x + 5 * (direct_w + gap), lilac, purple),
        ("Salesmanager", start_x + 6 * (direct_w + gap), lilac, purple),
    ]

    first_mid = direct_reports[0][1] + direct_w // 2
    last_mid = direct_reports[-1][1] + direct_w // 2
    draw_line(draw, (1754, 750), (1754, split_y), line)
    draw_line(draw, (first_mid, split_y), (last_mid, split_y), line)

    for label, x, fill, outline in direct_reports:
        draw_line(draw, (x + direct_w // 2, split_y), (x + direct_w // 2, direct_y), line)
        draw_visual_box(draw, (x, direct_y, direct_w, direct_h), label, fill, outline, ink, radius=20)

    team_w, team_h = 420, 112
    marketing_mid = direct_reports[5][1] + direct_w // 2
    sales_mid = direct_reports[6][1] + direct_w // 2
    marketing_team = [
        ("Marketing en communicatie", 2140, 1420, green_light, green),
        ("Ontwerp en verpakking", 2140, 1620, green_light, green),
        ("Brandmanager", 2140, 1820, green_light, green),
    ]
    sales_team = [
        ("Sales support", 2840, 1420, gold_light, gold),
        ("Klantcontact", 2840, 1620, gold_light, gold),
        ("Verkoop groothandel", 2840, 1820, gold_light, gold),
    ]

    # Marketing subtree
    marketing_split_y = 1330
    marketing_trunk_x = marketing_team[0][1] - 70
    draw_line(draw, (marketing_mid, direct_y + direct_h), (marketing_mid, marketing_split_y), line)
    draw_line(draw, (marketing_mid, marketing_split_y), (marketing_trunk_x, marketing_split_y), line)
    draw_line(draw, (marketing_trunk_x, marketing_split_y), (marketing_trunk_x, marketing_team[-1][2] + team_h // 2), line)
    for label, x, y, fill, outline in marketing_team:
        draw_line(draw, (marketing_trunk_x, y + team_h // 2), (x, y + team_h // 2), line)
        draw_visual_box(draw, (x, y, team_w, team_h), label, fill, outline, ink, radius=18)

    # Sales subtree
    sales_split_y = 1330
    sales_trunk_x = sales_team[0][1] - 70
    draw_line(draw, (sales_mid, direct_y + direct_h), (sales_mid, sales_split_y), line)
    draw_line(draw, (sales_mid, sales_split_y), (sales_trunk_x, sales_split_y), line)
    draw_line(draw, (sales_trunk_x, sales_split_y), (sales_trunk_x, sales_team[-1][2] + team_h // 2), line)
    for label, x, y, fill, outline in sales_team:
        draw_line(draw, (sales_trunk_x, y + team_h // 2), (x, y + team_h // 2), line)
        draw_visual_box(draw, (x, y, team_w, team_h), label, fill, outline, ink, radius=18)


    img.convert("RGB").save(path, quality=96)


def create_email_pdf():
    out = DOWNLOADS / "Bijlage 5 E-mail van collega over verkoopondersteuning.pdf"
    s = styles()
    doc = SimpleDocTemplate(str(out), pagesize=A4, leftMargin=22 * mm, rightMargin=22 * mm, topMargin=28 * mm, bottomMargin=20 * mm)

    data = [
        ["Datum", "Vandaag"],
        ["Aan", "jam@dutchdelight.nl"],
        ["Van", "s.vandijk@dutchdelight.nl"],
        ["Cc", ""],
        ["Onderwerp", "DolceDistribuzione"],
        ["Bijlage", ""],
    ]
    table = Table(data, colWidths=[32 * mm, 118 * mm])
    table.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 10),
                ("TEXTCOLOR", (0, 0), (0, -1), PURPLE),
                ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
                ("LINEBELOW", (0, 0), (-1, -1), 0.4, colors.HexColor("#cccccc")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )

    story = [
        Paragraph("Bijlage 5 E-mail van collega over verkoopondersteuning", s["HeadingDutch"]),
        Spacer(1, 8),
        table,
        Spacer(1, 18),
        Paragraph("Beste collega junior accountmanager,", s["Normal"]),
        Spacer(1, 8),
        Paragraph(
            "Gisteren sprak ik toevallig met Signora Giulia Romano van DolceDistribuzione op een internationale foodbeurs. Zij gaf aan dat zij positief is over de samenwerking met DutchDelight Chocolates. De proefverpakkingen van Noire Velvet Orange, Noire Caramel Sea Salt en Noire Dark Almond Selection zijn in goede orde ontvangen. De eerste productinformatie over Noire Signature Bars is gedeeld met een aantal delicatessenwinkels en horecaklanten.",
            s["Normal"],
        ),
        Spacer(1, 8),
        Paragraph(
            "Zij gaf ook aan dat de verkoop minder snel op gang komt dan verwacht. Er is interesse in de Noire-producten, maar klanten vragen om extra ondersteuning om Noire Signature Bars goed te kunnen presenteren. Vooral winkelmateriaal, proeverijen en duidelijke verkoopargumenten voor het premiumsegment zijn volgens haar belangrijk.",
            s["Normal"],
        ),
        Spacer(1, 8),
        Paragraph(
            "Signora Romano vraagt of wij op korte termijn extra verkoopondersteuning kunnen leveren. Het is urgent, omdat DolceDistribuzione de introductie in Noord- en Midden-Italie de komende weken wil versterken.",
            s["Normal"],
        ),
        Spacer(1, 8),
        Paragraph("Wat stel jij voor?", s["Normal"]),
        Spacer(1, 16),
        Paragraph("Met vriendelijke groet,", s["Normal"]),
        Spacer(1, 8),
        Paragraph("S. van Dijk<br/>Junior accountmanager", s["Normal"]),
    ]
    doc.build(story, onFirstPage=lambda c, d: draw_header_footer(c, d, "Bijlage 5 E-mail van collega over verkoopondersteuning"))
    return out


def email_table(rows):
    table = Table(rows, colWidths=[32 * mm, 118 * mm])
    table.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 10),
                ("TEXTCOLOR", (0, 0), (0, -1), PURPLE),
                ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
                ("LINEBELOW", (0, 0), (-1, -1), 0.4, colors.HexColor("#cccccc")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def create_sales_support_pdf():
    out = DOWNLOADS / "Bijlage 6 E-mail van sales support.pdf"
    s = styles()
    doc = SimpleDocTemplate(str(out), pagesize=A4, leftMargin=22 * mm, rightMargin=22 * mm, topMargin=28 * mm, bottomMargin=20 * mm)
    rows = [
        ["Datum", "Vrijdag"],
        ["Aan", "jam@dutchdelight.nl"],
        ["Van", "l.peters@dutchdelight.nl"],
        ["Cc", ""],
        ["Onderwerp", "Verkopen DolceDistribuzione en marktkansen"],
        ["Bijlage", ""],
    ]
    story = [
        Paragraph("Bijlage 6 E-mail van sales support", s["HeadingDutch"]),
        Spacer(1, 8),
        email_table(rows),
        Spacer(1, 18),
        Paragraph("Beste collega,", s["Normal"]),
        Spacer(1, 8),
        Paragraph("Ik heb de eerste verkoopinformatie over DolceDistribuzione op een rij gezet.", s["Normal"]),
        Spacer(1, 8),
        Paragraph(
            "De verkopen van Noire Velvet Orange, Noire Caramel Sea Salt en Noire Dark Almond Selection stijgen, maar langzamer dan gepland. Voor het eerste jaar was voor DolceDistribuzione een afzetdoel van 900.000 verpakkingen afgesproken. Op basis van de huidige cijfers komt DolceDistribuzione uit op ongeveer 620.000 verpakkingen.",
            s["Normal"],
        ),
        Spacer(1, 8),
        Paragraph(
            "DolceDistribuzione verwacht komend jaar ongeveer 1,2 miljoen verpakkingen in Noord- en Midden-Italie te kunnen verkopen. Dat is een mooie groei, maar onvoldoende om de Europese verkoopdoelen van DutchDelight Chocolates volledig te ondersteunen. Mogelijk is naast DolceDistribuzione een tweede distributeur nodig voor Zuid-Italie of voor andere Zuid-Europese markten.",
            s["Normal"],
        ),
        Spacer(1, 8),
        Paragraph(
            "Kun jij deze informatie meenemen in het evaluatierapport voor M. de Bruin?",
            s["Normal"],
        ),
        Spacer(1, 16),
        Paragraph("Met vriendelijke groet,", s["Normal"]),
        Spacer(1, 8),
        Paragraph("L. Peters<br/>Medewerker sales support", s["Normal"]),
    ]
    doc.build(story, onFirstPage=lambda c, d: draw_header_footer(c, d, "Bijlage 6 E-mail van sales support"))
    return out


def create_evaluation_report_pdf():
    out = DOWNLOADS / "Bijlage 7 Verslag evaluatiegesprek met account DolceDistribuzione.pdf"
    s = styles()
    doc = SimpleDocTemplate(str(out), pagesize=A4, leftMargin=22 * mm, rightMargin=22 * mm, topMargin=28 * mm, bottomMargin=20 * mm)
    story = [
        Paragraph("Bijlage 7 Verslag evaluatiegesprek met account DolceDistribuzione", s["HeadingDutch"]),
        Spacer(1, 8),
        Paragraph("Verslag evaluatiegesprek met account DolceDistribuzione", s["TitleDutch"]),
        Paragraph("<b>Datum:</b> vrijdag", s["Normal"]),
        Spacer(1, 8),
        Paragraph("<b>Aanwezig</b>", s["HeadingDutch"]),
        Paragraph("Signora Giulia Romano, DolceDistribuzione<br/>M. de Bruin, accountmanager DutchDelight Chocolates<br/>J. Vermeer, junior accountmanager DutchDelight Chocolates", s["Normal"]),
        Spacer(1, 8),
        Paragraph(
            "Met Giulia Romano van DolceDistribuzione is het accountplan geëvalueerd. Besproken zijn de verkopen in het afgelopen jaar, de klanttevredenheid, de samenwerking en de plannen voor het volgende jaar. Beide partijen geven aan dat er vertrouwen is in de samenwerking, maar dat de introductie van Noire Signature Bars sterker ondersteund moet worden.",
            s["Normal"],
        ),
        Paragraph("Omzet- en afzetdoelen", s["HeadingDutch"]),
        Paragraph(
            "DolceDistribuzione heeft in het eerste jaar ongeveer 620.000 verpakkingen verkocht. Noire Velvet Orange verkocht het best, gevolgd door Noire Caramel Sea Salt. Noire Dark Almond Selection blijft achter bij de verwachting. De meeste verkopen kwamen uit Noord-Italie. In Midden-Italie groeit de belangstelling, maar daar is nog meer verkoopondersteuning nodig.",
            s["Normal"],
        ),
        Paragraph("Prijsafspraken", s["HeadingDutch"]),
        Paragraph(
            "DolceDistribuzione geeft aan dat de verkoopprijs past bij het premiumsegment, maar dat sommige klanten extra uitleg nodig hebben over kwaliteit, herkomst van ingrediënten en luxe verpakking. Een algemene prijsverlaging vindt DolceDistribuzione niet noodzakelijk. Wel vraagt het bedrijf om tijdelijke introductieacties voor delicatessenwinkels en horeca.",
            s["Normal"],
        ),
        Paragraph("Klanttevredenheid", s["HeadingDutch"]),
        Paragraph(
            "DolceDistribuzione is tevreden over de productkwaliteit en leverbetrouwbaarheid. De verkoopondersteuning kan beter. Productinformatie is vooral in het Nederlands en Engels beschikbaar, terwijl Italiaanse verkoopmaterialen nodig zijn. Ook mist DolceDistribuzione voorbeelden voor winkelpresentaties, proeverijen en verkoopargumenten voor het premiumsegment.",
            s["Normal"],
        ),
        Paragraph("Marketing en presentatie", s["HeadingDutch"]),
        Paragraph(
            "De uitstraling van Noire Velvet Orange, Noire Caramel Sea Salt en Noire Dark Almond Selection past bij het luxe segment van Noire. Wel sluit de huidige promotie nog onvoldoende aan op Italiaanse delicatessenwinkels en horeca. DolceDistribuzione adviseert om meer aandacht te besteden aan productbeleving, cadeauverpakkingen en combinaties met koffie en dessertkaarten.",
            s["Normal"],
        ),
        Paragraph("Verkoopdoelen volgend jaar", s["HeadingDutch"]),
        Paragraph(
            "DutchDelight Chocolates wil de Europese afzet van Noire Signature Bars verder laten groeien. DolceDistribuzione verwacht komend jaar ongeveer 1,2 miljoen verpakkingen te kunnen verkopen. Meer afzet is mogelijk als DutchDelight zorgt voor Italiaanse verkoopmaterialen, proeverijen, betere productpresentaties en duidelijke afspraken over contactmomenten.",
            s["Normal"],
        ),
    ]
    doc.build(story, onFirstPage=lambda c, d: draw_header_footer(c, d, "Bijlage 7 Verslag evaluatiegesprek met account DolceDistribuzione"))
    return out


def create_product_info_pdf():
    out = DOWNLOADS / "Bijlage 8 Informatie over Noire Signature Bars.pdf"
    s = styles()
    doc = SimpleDocTemplate(str(out), pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm, topMargin=28 * mm, bottomMargin=18 * mm)
    logo = SITE_ASSETS / "logo-dutchdelight.png"
    story = [Paragraph("Bijlage 8 Informatie over Noire Signature Bars", s["HeadingDutch"])]
    if logo.exists():
        story.extend([Spacer(1, 6), RLImage(str(logo), width=42 * mm, height=22 * mm), Spacer(1, 8)])
    story.extend(
        [
            Paragraph(
                "DutchDelight Chocolates heeft drie nieuwe varianten binnen Noire Signature Bars geïntroduceerd: Noire Velvet Orange, Noire Caramel Sea Salt en Noire Dark Almond Selection. De producten zijn ontwikkeld voor het premiumsegment en onderscheiden zich door hoogwaardige ingrediënten, verfijnde smaakcombinaties en een luxe verpakking.",
                s["Normal"],
            ),
            Spacer(1, 10),
        ]
    )
    cell = ParagraphStyle(
        name="ProductTableCell",
        parent=s["Small"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=10.5,
        textColor=TEXT,
    )
    cell_bold = ParagraphStyle(
        name="ProductTableHead",
        parent=cell,
        fontName="Helvetica-Bold",
        textColor=colors.white,
    )
    data = [
        [Paragraph("Product", cell_bold), Paragraph("Smaak", cell_bold), Paragraph("Kenmerk", cell_bold), Paragraph("Verpakking", cell_bold)],
        [Paragraph("Noire Velvet Orange", cell), Paragraph("Pure chocolade met sinaasappel", cell), Paragraph("Vol, verfijnd en licht citrusachtig", cell), Paragraph("Mat zwarte Noire-verpakking met oranje en goudaccent", cell)],
        [Paragraph("Noire Caramel Sea Salt", cell), Paragraph("Chocolade met karamel en zeezout", cell), Paragraph("Rijk, toegankelijk en licht hartig", cell), Paragraph("Mat zwarte Noire-verpakking met koperaccent", cell)],
        [Paragraph("Noire Dark Almond Selection", cell), Paragraph("Pure chocolade met geroosterde amandel", cell), Paragraph("Krachtig, notig en volwassen", cell), Paragraph("Mat zwarte Noire-verpakking met diepbruin en goudaccent", cell)],
    ]
    table = Table(data, colWidths=[38 * mm, 48 * mm, 48 * mm, 40 * mm], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PURPLE),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#cccccc")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#fbf8fb")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    story.extend(
        [
            table,
            Spacer(1, 14),
            Paragraph("Kenmerken van Noire Signature Bars", s["HeadingDutch"]),
            Paragraph(
                "Noire Signature Bars zijn bedoeld voor delicatessenwinkels, luxe warenhuizen, horeca en distributeurs die zich richten op hoogwaardige voedingsproducten. Voor zakelijke klanten zijn vooral de luxe uitstraling, onderscheidende smaakcombinaties, cadeauwaarde en betrouwbare levering belangrijk.",
                s["Normal"],
            ),
            Paragraph(
                "De verkoopprijs aan de groothandel is bepaald op € 2,40 exclusief btw per verpakking. De producten zijn geschikt voor losse verkoop, cadeaupakketten en presentatie bij proeverijen of tijdelijke introductieacties.",
                s["Normal"],
            ),
        ]
    )
    doc.build(story, onFirstPage=lambda c, d: draw_header_footer(c, d, "Bijlage 8 Informatie over Noire Signature Bars"))
    return out


if __name__ == "__main__":
    DOWNLOADS.mkdir(exist_ok=True)
    print(create_organogram_pdf())
    print(create_email_pdf())
    print(create_sales_support_pdf())
    print(create_evaluation_report_pdf())
    print(create_product_info_pdf())
