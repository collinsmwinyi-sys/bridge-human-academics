# StudyHuman updates applied

This version focuses on turning the landing page into a clearer working service flow.

## Changed
- Replaced default Lovable metadata with StudyHuman metadata.
- Updated public package name to `studyhuman`.
- Changed the homepage hero copy to emphasize instant pricing and human academic help.
- Replaced unsupported institution/location trust wording with safer global trust microcopy.
- Changed the header Get Started button to open the request flow instead of account registration.
- Renamed AI Writing Check public labels to Writing Check while keeping the existing route path for compatibility.
- Updated footer support links so Human Support and Contact open the Messages page.
- Updated pricing CTAs from vague custom quotes to Calculate My Price.

## Added / improved
- Rebuilt `/request-help` as a five-step request flow:
  1. Choose service
  2. Add details
  3. Review estimate
  4. Submit contact details
  5. Confirmation
- Added survey-specific fields for participant recruitment requests.
- Added preferred-helper query support, e.g. `/request-help?helper=Dr.%20Amara%20Okafor`.
- Rebuilt `/messages` as a live human support experience with conversation list, active chat, request summary, and request CTA.
- Updated helper card CTAs to pass the selected helper into the request flow.

## Notes
- No backend/database integration was added. Forms and messages remain frontend demo flows.
- The route path `/ai-writing-check` is still used so existing links do not break, but public labels now say Writing Check.
