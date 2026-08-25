# Faro Creative email signature

Source of truth is `docs/email-signature.html`. Everything else is generated from it.

| File | What it is |
| --- | --- |
| `docs/email-signature.html` | The signature markup. Edit this one. |
| `docs/faro.mailsignature` | The same markup with Apple Mail's MIME headers, ready to drop in. |
| `sig-src/*.svg` | Vector sources for the mark and the four icons. |
| `public/sig/*.png` | Rendered assets, served from `https://www.faro.is/sig/`. |

## Contents

Jack MacNally, Founder, Faro Creative. Website, email, phone, location, and a
one-line studio descriptor under a hairline rule. The mark links to faro.is.

Palette is the site palette: `#1A3640` deep for the name and the mark tile,
`#4A8C86` accent for the role line and the icons, `#A8CCCA` for the rules,
`#2A3840` for body text. Type is Figtree where it is installed, falling back to
Helvetica Neue and Arial.

## Rebuilding

```bash
sig-src/build.sh              # SVG to PNG, needs rsvg-convert
sig-src/make-mailsignature.sh # HTML to .mailsignature
```

Icons render at 2x their display size, 22px for an 11px slot. The mark renders
at 144px for a 72px slot.

## Installing in Apple Mail

Apple Mail will not pick up a `.mailsignature` file it does not already know
about, so the signature has to be created through the UI first and then have its
contents replaced.

1. Mail, Settings, Signatures. Create a new signature, name it `Jack - Faro`,
   and type a single character into it so the file is written. Quit Mail.
2. Find the new file's ID:
   ```bash
   cd ~/Library/Mail/V10/MailData/Signatures
   plutil -p AllSignatures.plist | grep -A2 'Jack - Faro'
   ```
3. Replace its contents and lock the file so Mail cannot rewrite it:
   ```bash
   cp ~/faro-creative/docs/faro.mailsignature <ID>.mailsignature
   chflags uchg <ID>.mailsignature
   ```
4. Reopen Mail and set the signature on the Faro account.

To edit it later: quit Mail, `chflags nouchg <ID>.mailsignature`, copy the new
build in, `chflags uchg`, reopen Mail.

## Why the images are hosted, not embedded

Apple Mail strips inline image parts from hand-authored signatures on send. A
signature using `cid:` references to base64 parts previews correctly in compose
and arrives at the recipient with broken-image placeholders. Absolute `https://`
URLs are the only reliable route. The tradeoff is that some recipients see a
"load images" prompt on first view.

URLs point at `www.faro.is` rather than `faro.is`, because the apex redirects and
not every mail client follows a redirect for images.
