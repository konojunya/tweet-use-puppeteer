const puppeteer = require("puppeteer");

async function tweet(text) {
  // ブラウザ開く
  const browser = await puppeteer.launch({
    args: ["--lang=ja,en-US,en"], // 日本語にする
    headless: false // headlessモードをtrue/falseにする（trueだとブラウザでてこないが、今回はgit取るためにfalseにしてる）
  });

  // 新しいページつくる
  const page = await browser.newPage();

  // ページの大きさ定義
  await page.setViewport({ width: 720, height: 600 });

  // twitterのサイトへいく
  await page.goto("https://twitter.com/konojunya");

  // twitter id 入力
  await page.type(
    "#signin-dropdown > div.signin-dialog-body > form > div.LoginForm-input.LoginForm-username > input",
    "<your twitter id>"
  );

  // twitter password 入力
  await page.type(
    "#signin-dropdown > div.signin-dialog-body > form > div.LoginForm-input.LoginForm-password > input",
    "<your twitter password>"
  );

  // ログインボタンクリック
  await page.click(
    "#signin-dropdown > div.signin-dialog-body > form > input.EdgeButton.EdgeButton--primary.EdgeButton--medium.submit.js-submit"
  );

  // ページ遷移するの待つ
  await page.waitFor("#global-new-tweet-button", {timeout: 5000});

  // ツイートボタンclick
  await page.click("#global-new-tweet-button");

  // textareaにツイート本文打ち込む
  await page.type(
    "#Tweetstorm-tweet-box-0 > div.tweet-box-content > div.tweet-content > div.RichEditor.RichEditor--emojiPicker.is-fakeFocus > div.RichEditor-container.u-borderRadiusInherit > div.RichEditor-scrollContainer.u-borderRadiusInherit > div.tweet-box.rich-editor.is-showPlaceholder",
    text
  );

  // ツイートするボタン
  await page.click(
    "#Tweetstorm-tweet-box-0 > div.tweet-box-content > div.TweetBoxToolbar > div.TweetBoxToolbar-tweetButton > span > button.SendTweetsButton.EdgeButton.EdgeButton--primary.EdgeButton--medium.js-send-tweets"
  );

  // ツイートするの待つ
  await page.waitFor(5000);

  // 終わり
  await browser.close();
}

// tweet
tweet("めっちゃトイレ行きたい by puppeteer");
