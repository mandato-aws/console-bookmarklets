&#8678; [AWS Console Bookmarkets](/README.md)

# S3 Downloader
The S3 Downloader automates the downloading of files in the AWS S3 Console.

## How it works
The Bookmarklet will only function correctly when in the AWS Web Console for the Amazon S3 service viewing a specific bucket's list of objects (files and folders).
When invoked, you will first be prompted for a delay in seconds between each download. The minimum length is 1 second.
A second prompt will then ask for the start row number, or a start-end row number combination. Row number 1 is the first row number (Please make a fork of this if you prefer zero indexed rows).

Note: You must not check any boxes before using this tool. Any checked boxes will disable the download button and thwart the ability of this Bookmarklet to download.

## Documentation
For additional documentation with images, please go to [Angelo Mandato's blog post about this AWS Console S3 Downloader](https://angelo.mandato.com/aws-s3-console-downloader-bookmarklet/).

## **THE Bookmarklet CODE**

```
javascript:(function()%7Bjavascript%3A%20(()%20%3D%3E%20%7B%0A%0Afunction%20downloadS3(rowStart%2CrowEnd%2CdelaySeconds%3D1)%7B%0A%20%20console.log(%22Downloading%20files...%20Row%20Start%3A%20%22%2B%20rowStart%20%2B%22%3B%20Row%20End%3A%20%22%2B%20rowEnd%20%2B%22%3B%20Seconds%20between%20downloads%3A%20%22%2BdelaySeconds)%3B%0A%20%20const%20checkboxes%20%3D%20document.querySelectorAll('div%5Bclass%3D%22s3-objects-view-container%22%5D%20div%5Bclass%5E%3D%22awsui_content_%22%5D%20input%5Btype%3D%22checkbox%22%5D')%3B%0A%20%20if(%20checkboxes%20)%20%7B%0A%20%20%20%20var%20rowNum%20%3D%200%3B%0A%20%20%20%20var%20dlCount%20%3D%200%3B%0A%20%20%20%20checkboxes.forEach(checkbox%20%3D%3E%20%7B%0A%20%20%20%20%20%20if(%20rowNum%20%3E%200%20%26%26%20rowNum%20%3E%3D%20rowStart%20%26%26%20rowNum%20%3C%3D%20rowEnd)%20%7B%0A%20%20%20%20%20%20%20%20const%20thisRow%20%3D%20rowNum%3B%0A%20%20%20%20%20%20%20%20setTimeout(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20console.log(%20'Row%3A%20'%2BthisRow%20%2B%20%22%3B%20id%3A%20%22%2Bcheckbox.id%20)%3B%0A%20%20%20%20%20%20%20%20%20%20var%20Elem%20%3D%20document.getElementById(%20checkbox.id%20)%3B%0A%20%20%20%20%20%20%20%20%20%20if(%20Elem%20)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20Elem.click()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20document.getElementById('download-object-button').click()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20Elem.click()%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%20dlCount%20*%201000%20*%20delaySeconds%20)%3B%0A%20%20%20%20%20%20%20%20dlCount%2B%2B%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20rowNum%2B%2B%3B%0A%20%20%20%20%7D)%3B%0A%20%20%7D%0A%7D%0A%0Alet%20secondsDelay%20%3D%20prompt(%22BEFORE%20PROCEEDING%2C%20MAKE%20SURE%20NONE%20OF%20THE%20ROWS%20ARE%20CHECKED.%5CnEnter%20the%20number%20of%20seconds%20between%20downloads.%5Cn%5CnTIP%3A%20Setup%20your%20browser%20to%20automatically%20download%20files%20before%20you%20continue.%5Cn%5CnDO%20NOT%20NAVIGATE%20AWAY%20FROM%20THIS%20PAGE%20UNTIL%20DOWNLOADS%20FINISHED.%5Cn%5CnNOTE%3A%20Folders%20will%20not%20be%20downloaded.%22%2C%20%221%22)%3B%0Aif(%20secondsDelay%20%3D%3D%20null%20)%20%7B%20return%3B%20%7D%0Aconst%20regex1%20%3D%20%2F%5E(%5Cd%2B)%24%2Fg%3B%0Alet%20matches1%20%3D%20regex1.exec(secondsDelay)%3B%0Aif(%20matches1%20%3D%3D%20null%20%7C%7C%20matches1.length%20%3C%202%20)%20%7B%0A%20%20%20%20alert('Seconds%20entered%20is%20invalid.')%3B%0A%20%20%20%20return%3B%0A%7D%0AsecondsDelay%20%3D%20parseInt(secondsDelay)%3B%0Alet%20startRange%20%3D%20prompt(%22Enter%20the%20start%20row%20number%20(first%20row%20is%201).%5CnEnter%20a%20dash%20followed%20by%20another%20row%20number%20to%20specify%20a%20start-end%20range.%5CnThe%20next%2050%20rows%20are%20downloaded%20if%20no%20end%20range%20is%20specified.%5Cn%5CnExamples%3A%5Cn%20%201%20%20downloads%20rows%201-50%5Cn%20%20101-160%20%20downloads%20rows%20101-160%22%2C%20%221%22)%3B%0Aif(%20startRange%20%3D%3D%20null%20)%20%7B%20return%3B%20%7D%0Aif(%20secondsDelay%20%3C%201%20)%0A%20%20secondsDelay%20%3D%201%3B%0Alet%20rowStart%20%3D%201%3B%0Alet%20rowEnd%20%3D%20rowStart%2B50-1%3B%0Aconst%20regex2%20%3D%20%2F%5E(%5Cd%2B)(%3F%3A-(%5Cd%2B))%3F%24%2Fg%3B%0Alet%20matches2%20%3D%20regex2.exec(startRange)%3B%0Aif(%20matches2%20%3D%3D%20null%20%7C%7C%20matches2.length%20%3C%202%20)%20%7B%0A%20%20%20%20alert('Row%20start%20number%20or%20start-end%20range%20is%20invalid.')%3B%0A%20%20%20%20return%3B%0A%7D%0A%0Aif(%20matches2.length%20%3D%3D%203%20%26%26%20matches2%5B2%5D%20!%3D%20null%20)%20%7B%0A%20%20%20%20rowStart%20%3D%20parseInt(matches2%5B1%5D)%3B%0A%20%20%20%20rowEnd%20%3D%20parseInt(matches2%5B2%5D)%3B%0A%20%20%20%20if(%20rowEnd%20%3C%20rowStart%20)%20%7B%0A%20%20%20%20%20%20alert('End%20row%20number%20must%20be%20greater%20than%20start%20row%20number.')%3B%0A%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%7D%20else%20%7B%0A%20%20%20%20rowStart%20%3D%20parseInt(matches2%5B1%5D)%3B%0A%20%20%20%20rowEnd%20%3D%20rowStart%2B50-1%3B%0A%7D%0AdownloadS3(rowStart%2CrowEnd%2CsecondsDelay)%3B%0A%7D)()%3B%7D)()%3B
```

## Installation Instructions

1. Go to your browsers bookmarks and create a new bookmark. In Chrome this is referred to as *Add page...*.
1. Enter a title for your bookmark, we recommend *S3 Downloader*.
1. In the *URL* input field, paste the contents of the Bookmarklet code above.
1. Save the bookmark.

You now have added the *S3 Downloader* Bookmarklet to your browser.

Tip: You may find the use of the browsers' bookmarks toolbar to be useful for referencing Bookmarklets.
