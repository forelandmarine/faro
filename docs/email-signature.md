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

## Installed state

Installed on 25 August 2026 as signature `Jack - Faro`, ID
`80819636-D895-490D-90C2-8C14AE257F91`, set as the default on the
`hello@faro.is` account (`ADA3B82B-E8FA-4F2F-9C1D-FBE63D31D70F`).

## Installing in Apple Mail

Signatures sync through iCloud. The master list is

```
~/Library/Mobile Documents/com~apple~mail/Data/V4/Signatures/AllSignatures.plist
```

and the local `~/Library/Mail/V10/MailData/Signatures/AllSignatures.plist` is
rebuilt from it on launch. Adding an entry only to the local copy does not work,
Mail silently reverts it. Creating a signature through Mail's AppleScript
interface does not work either, it is discarded on quit.

With Mail quit:

```bash
ICL=~/Library/Mobile\ Documents/com~apple~mail/Data/V4/Signatures
LOC=~/Library/Mail/V10/MailData/Signatures
PB=/usr/libexec/PlistBuddy
SIGID=$(uuidgen)
ACCT=ADA3B82B-E8FA-4F2F-9C1D-FBE63D31D70F   # hello@faro.is

cp ~/faro-creative/docs/faro.mailsignature "$LOC/$SIGID.mailsignature"

# register in both plists, iCloud master first
for P in "$ICL/AllSignatures.plist" "$LOC/AllSignatures.plist"; do
  N=$($PB -c "Print :" "$P" | grep -c SignatureUniqueId)
  $PB -c "Add :$N dict" \
      -c "Add :$N:SignatureIsRich bool true" \
      -c "Add :$N:SignatureName string 'Jack - Faro'" \
      -c "Add :$N:SignatureUniqueId string $SIGID" "$P"
done

# attach to the account and make it the default
$PB -c "Add :$ACCT:Signatures:0 string $SIGID" "$LOC/AccountsMap.plist"
defaults write com.apple.mail SignaturesSelected -dict-add "$ACCT" "$SIGID"
defaults write com.apple.mail SignatureSelectionMethods -dict-add "$ACCT" SelectedOnly

chflags uchg "$LOC/$SIGID.mailsignature"
```

Mail's preferences live in the sandbox container at
`~/Library/Containers/com.apple.mail/Data/Library/Preferences/com.apple.mail.plist`.
`defaults` resolves the `com.apple.mail` domain there correctly, so no path is
needed.

To edit it later: quit Mail, `chflags nouchg <ID>.mailsignature`, copy the new
build in, `chflags uchg`, reopen Mail. The lock matters, it is what stops iCloud
pushing a stale copy of the file back over the local one.

## Why the images are hosted, not embedded

Apple Mail strips inline image parts from hand-authored signatures on send. A
signature using `cid:` references to base64 parts previews correctly in compose
and arrives at the recipient with broken-image placeholders. Absolute `https://`
URLs are the only reliable route. The tradeoff is that some recipients see a
"load images" prompt on first view.

URLs point at `www.faro.is` rather than `faro.is`, because the apex redirects and
not every mail client follows a redirect for images.
