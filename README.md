# Muhammad Tahir — Executive Portfolio

A premium, responsive, one-page personal portfolio for **Muhammad Tahir**. Built with plain HTML, CSS and JavaScript. **No Lovable, React, hosting service, npm install, or build step needed.**

## What's included

- Premium dark/gold editorial design, portrait hero and custom visual effects
- Mobile-friendly layout, accessible navigation and keyboard support
- Interactive business filters and eight company detail popups
- Scroll reveals, animated career statistics, real 3D CSS perspective portrait
- Full leadership timeline, biography, principles and email contact
- Local, optimized versions of the user-supplied portrait and company logos
- Search-engine basics, favicon, social share thumbnail and GitHub Pages support

## Structure

```text
Muhammad-Tahir-Portfolio/
├── index.html                 # The complete website content
├── styles.css                 # Visual system, effects and responsive styles
├── script.js                  # Interactions, filtering and company details
├── README.md                  # This guide
├── .nojekyll                  # Makes GitHub Pages serve files as-is
└── assets/
    ├── muhammad-tahir-portrait.webp
    ├── diplomat-properties.webp
    ├── business-link-consultancies.webp
    ├── rise-properties.webp
    ├── faiza-saqlain.webp
    ├── social-preview.jpg
    └── favicon.svg
```

## Publish on GitHub Pages (browser method — easiest)

1. Extract the ZIP. **Upload the files inside the extracted folder**, not the ZIP and not a second nested folder.
2. On GitHub, open your repository. Select **Add file → Upload files**.
3. Upload `index.html`, `styles.css`, `script.js`, `README.md`, `.nojekyll`, and the full `assets` folder.
4. Commit the upload to the `main` branch. If older site files exist, replace the same filenames rather than keeping two versions.
5. Go to **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
6. Your normal Pages website address is `https://USERNAME.github.io/REPOSITORY/`. Replace `USERNAME` and `REPOSITORY` with the real GitHub account and repository name. GitHub shows the exact live URL in **Settings → Pages** once published.

For example, for a repository named `tahir-leadership-portfolio` under an account named `Diplomat-Properties`, the conventional GitHub Pages URL would be `https://diplomat-properties.github.io/tahir-leadership-portfolio/` **after** GitHub Pages is successfully enabled. That is an example, not a claim the website is currently live.

### Existing Git repository (terminal method)

Run these commands in the **extracted folder** (only if it is not already a Git repository):

```bash
git init
git add .
git commit -m "Launch Muhammad Tahir executive portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

If your repository already contains a website, use normal Git pull/commit/push in that repository rather than running `git init` again.

## Preview locally

Double-click `index.html`, or use any simple local static server. The fonts may look slightly different offline because Google Fonts loads only when connected to the internet. **The website itself has no external JavaScript dependencies.**

## Edit content

- **Name, headings, roles, timeline, stats, mail address:** edit `index.html`.
- **Company pop-up details:** edit the `companies` object in `script.js`.
- **Colours:** edit CSS design tokens under `:root` in `styles.css`.
- **Portrait and logos:** replace the corresponding files in `assets`, keeping the same file names.
- **Primary contact:** currently `tahirbaig77@gmail.com`. Update every occurrence in `index.html` and `script.js` if needed.

## Important pre-publication checks

The supplied resume and the current user instructions use **different names for two earlier businesses**:

- The user requested **Diplomat Trading LLC**. The resume says **Diplomat General Trading**.
- The user requested **Business Link Transport LLC**. The resume says **Dubai Link Transport**.

This website follows the **latest explicit names** requested. Verify legal brand names and the displayed periods of service before publishing. The generic lettering used for these businesses is a **design treatment, not an official logo**. Replace it when official artwork is supplied.

Other intentional content decisions:

- `30+ years` and `200+ staff` are stated as provided by the user. The website does **not** claim independently audited figures.
- The career starts as **Sales Representative** at Black Pool General Trading per the user's instructions; the source resume lists **Sales Executive**.
- **Diplomat Properties** and **Business Link Consultancies**: Proprietor.
- **Rise Properties LLC** and **Rise Properties LLC (Branch)**: Director & Partner.
- **Faiza Saqlain Ready Made Garments**: Sales Director & Partner.
- Qualifications, certifications and degrees are omitted as requested.
- No invented sales volume, awards, review ratings, project results or additional contact links are published.

## Copyright

Business names, logos, portrait and biographical material are supplied by the client. Do not reuse outside the authorised portfolio.
