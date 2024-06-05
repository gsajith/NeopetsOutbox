// ==UserScript==
// @name         Neopets Neomail Outbox
// @namespace    neopets
// @version      2024-05-10
// @description  Outbox for neomail
// @author       Gautham Sajith (https://github.com/gsajith)
// @match        https://www.neopets.com/neomessages.phtml*
// @icon         https://www.neopets.com/favicon.ico
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

function parseDate(timestamp) {
  const date = new Date(new Date(timestamp).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = ('0' + date.getMinutes()).slice(-2);
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return (month + "/" + day + "/" + year + " " + hours + ":" + minutes + ampm);
}

function stripHtml(html)
{
   let tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

(function() {
    'use strict';

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('type');
    const folder = urlParams.get('folder');
    const sentMailId = urlParams.get('sentMailId');
    const NM_ID = "np_outbox_sentlist";
    const sentMessages = GM_getValue(NM_ID, []);
    const OUTBOX_ID = 'AutoOutbox';
    const checkedForAction = {};

    if (type === 'send') {
        addSendListener();
        addRecipientChangeListener();

    } else if (folder === OUTBOX_ID) {
        const content = Array.from(document.getElementsByClassName("content"))[0];

        // Only set content if folder is otherwise empty
        const outboxEmpty = content.innerHTML.includes("You do not have any messages in this folder.");
        if (outboxEmpty) {
            // Set count of sent messages stored
            const countDiv = Array.from(document.getElementsByTagName('div')).filter(div => div.align === "center")[1];
            countDiv.innerHTML = "<div style='text-align: left;'><b>Note:</b> When you have more than <b>100</b> messages in your Inbox, you cannot receive Neomail! <br><br><b style='color:#FF0000;'>Anyone found to be breaking our <a href='/chatrules.phtml' target='_blank'>rules</a> will have their account permanently frozen.</b> If you spot anything that isn't right and our monitors haven't addressed the problem, please notify us using <a href='/autoform_abuse.phtml?abuse=report'><b>this form</b></a> and it will be removed ASAP.<br><br> If you could help us by deleting old messages, we would really appreciate it!<br><br/></div><b>Viewing:</b> Outbox | <b>Messages:</b> " + sentMessages.length;

            const lastChild = content.children[content.children.length - 1];
            lastChild.children[2].innerHTML = sentMailId === null ? generateAllMailContent(null) : generateContent(sentMailId);

            addOutboxListeners("https://www.neopets.com/neomessages.phtml?folder=" + OUTBOX_ID);
        }
    }

    function addOutboxListeners(href) {
        // Event handlers
        const checkboxes = Array.from(document.getElementsByClassName('checkSent'));
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                if (event.currentTarget.checked) {
                    checkedForAction[checkbox.value] = true;
                } else {
                    checkedForAction[checkbox.value] = undefined;
                    delete checkedForAction[checkbox.value];
                }
            });
        });

        const checkAllCheckbox = document.getElementById('checkall');
        if (checkAllCheckbox) {
            checkAllCheckbox.addEventListener('change', (event) => {
                checkboxes.forEach(checkbox => {
                    if (checkbox.checked !== event.currentTarget.checked) {
                        checkbox.click();
                    }
                });
            });
        }

        const actionButton = document.getElementById('actionButton');
        if (actionButton) {
            actionButton.addEventListener('click', () => {
                const selectValue = document.getElementById("actionSelect").value;
                if (selectValue === "Delete Messages") {
                    const newSent = sentMessages.filter(sent => !(sent.id in checkedForAction));
                    GM_setValue(NM_ID, newSent);
                    window.location.href = href;
                }
            });
        }
    }

    function generateAllMailContent(userFilter) {
        const mainTable = document.createElement('table');
        mainTable.width = "100%";
        mainTable.align = "center";
        mainTable.cellPadding = "3";
        mainTable.cellSpacing = "0";
        mainTable.border = "0";
        mainTable.style.border = "1px solid #000000";
        const tbody = document.createElement('tbody');
        mainTable.appendChild(tbody);
        const headerRow = document.createElement('tr');
        function createHeaderTd(text, width) {
            const td = document.createElement('td');
            if (width !== null) {
                td.width = width;
            }
            td.className = "contentModuleHeaderAlt";
            td.style.borderBottom = "1px solid #000000";
            td.innerHTML = '<b>' + text + '</b>';
            return td;
        }
        headerRow.appendChild(createHeaderTd('&nbsp;', 20));
        headerRow.appendChild(createHeaderTd('Date Sent', 130));
        headerRow.appendChild(createHeaderTd('To', 200));
        headerRow.appendChild(createHeaderTd('Subject', null));
        headerRow.appendChild(createHeaderTd('Status', 10));
        tbody.appendChild(headerRow);

        function createSentMailTd(text, isOdd) {
            const td = document.createElement('td');
            td.innerHTML = text;
            td.bgColor = isOdd ? "#FFFFFF" : "#EDEDED";
            td.className = "medText";
            td.style.borderBottom = "1px solid #000000";
            return td;
        }

        function createSentMailRow(item, index) {
            const isOdd = index % 2 === 0;
            const tr = document.createElement('tr');
            const td1 = createSentMailTd("<input type='checkbox' class='checkSent' value='" + item.id + "' id='" + item.id + "'/>", isOdd);
            const td2 = createSentMailTd("<label for='" + item.id + "'>" + parseDate(item.timestamp) + "</label>", isOdd);
            const td3 = createSentMailTd(
                "<span style='font-weight: normal; font-style: italic;'>"
                + (item.recipientName ? item.recipientName : '-')
                + "</span><br>[<a href='/userlookup.phtml?user="
                + item.recipient
                + "'><b>"
                + item.recipient
                + "</b></a>]", isOdd);
            const td4 = createSentMailTd(
                "<a href='neomessages.phtml?folder="
                + OUTBOX_ID
                + "&sentMailId="
                + item.id
                + "' style='font-size: 9pt; font-weight: normal;'>"
                + item.subject
                + "</a>", isOdd);
            td4.style.fontSize = "9pt";
            const td5 = createSentMailTd("Sent", isOdd);
            td5.align = "right";
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            return tr;
        }

        const filteredMessages = sentMessages.filter(item => userFilter !== null ? item.recipient === userFilter : true);

        filteredMessages.toReversed().forEach((message, index) => {
            tbody.appendChild(createSentMailRow(message, index));
        });

        const lastRow = document.createElement('tr');
        const checkAllTd = document.createElement('td');
        checkAllTd.colSpan = "2";
        checkAllTd.bgColor = "#DEDEDE";
        checkAllTd.align = "left";
        checkAllTd.style.verticalAlign = "middle";
        var checkAllCheckbox = document.createElement('input');
        checkAllCheckbox.type = "checkbox";
        checkAllCheckbox.name = "checkall";
        checkAllCheckbox.value = "value";
        checkAllCheckbox.id = "checkall";
        const checkAll = document.createElement('label');
        checkAll.innerHTML = " Check all ";
        checkAll.htmlFor = 'checkall';
        checkAllTd.appendChild(checkAllCheckbox);
        checkAllTd.appendChild(checkAll);
        const actionTd = document.createElement('td');
        actionTd.colSpan = "3";
        actionTd.bgColor = "#DEDEDE";
        actionTd.align = "right";
        const actionLabel = document.createElement('b');
        actionLabel.innerHTML = "Selected Messages: ";
        actionTd.appendChild(actionLabel);
        const actionSelect = document.createElement('select');
        actionSelect.id = "actionSelect";
        const defaultOption = document.createElement('option');
        defaultOption.innerHTML = "Select an Action";
        defaultOption.selected = true;
        actionSelect.appendChild(defaultOption);
        const deleteOption = document.createElement('option');
        deleteOption.innerHTML = "Delete Messages";
        deleteOption.value = "Delete Messages";
        actionSelect.appendChild(deleteOption);
        actionTd.appendChild(actionSelect);
        const actionButton = document.createElement('input');
        actionButton.type = 'submit';
        actionButton.value = 'Go!';
        actionButton.id = "actionButton";
        actionButton.style.marginLeft = "4px";
        actionTd.appendChild(actionButton);
        lastRow.appendChild(checkAllTd);
        lastRow.appendChild(actionTd);
        tbody.appendChild(lastRow);
        return mainTable.outerHTML;
    }

    function generateContent(id) {
        const item = sentMessages.find(message => message.id === id);
        if (id !== null && item) {
            const mainTable = document.createElement('table');
            mainTable.width = "100%";
            mainTable.align = "center";
            mainTable.cellPadding = "6";
            mainTable.cellSpacing = "1";
            mainTable.border = "0";
            mainTable.style.border = "1px solid #000000";
            const tbody = document.createElement('tbody');
            mainTable.appendChild(tbody);
            // To: label
            const toTr = document.createElement('tr');
            const toTrLabel = document.createElement('td');
            toTrLabel.width = "130";
            toTrLabel.bgColor = "#C8E3FF";
            toTrLabel.className= "medText";
            toTrLabel.style.fontWeight = "bold";
            toTrLabel.innerHTML = "To:";
            const toTrContent = document.createElement('td');
            toTrContent.bgColor = "#F6F6F6";
            toTrContent.className = "medText";
            const avatar = document.createElement('img');
            avatar.src = item.recipientAvatar ? item.recipientAvatar : "http://images.neopets.com/neoboards/avatars/default.gif";
            avatar.width = "50";
            avatar.height = "50";
            avatar.border = "0";
            avatar.align = "left";
            avatar.style.paddingRight = "4px";
            toTrContent.appendChild(avatar);
            toTrContent.appendChild(document.createElement('br'));
            toTrContent.appendChild(document.createTextNode("["));
            const userLink = document.createElement('a');
            userLink.href = "/userlookup.phtml?user=" + item.recipient;
            userLink.innerHTML = "<b>" + item.recipient + "</b>";
            toTrContent.appendChild(userLink);
            toTrContent.appendChild(document.createTextNode("] "));
            const userName = document.createElement('span');
            userName.style.fontWeight = "normal";
            userName.style.fontStyle = "italic";
            userName.innerHTML = (item.recipientName ? item.recipientName : '-');
            toTrContent.appendChild(userName);
            toTr.appendChild(toTrLabel);
            toTr.appendChild(toTrContent);
            tbody.appendChild(toTr);
            // Sent: time
            const sentTr = document.createElement('tr');
            const sentTrLabel = document.createElement('td');
            sentTrLabel.bgColor = "#C8E3FF";
            sentTrLabel.className = "medText";
            sentTrLabel.innerHTML = "<b>Sent:</b>";
            const sentTrContent = document.createElement('td');
            sentTrContent.bgColor = "#F6F6F6";
            sentTrContent.className = "medText";
            sentTrContent.innerHTML = parseDate(item.timestamp);
            sentTr.appendChild(sentTrLabel);
            sentTr.appendChild(sentTrContent);
            tbody.appendChild(sentTr);
            // Folder: outbox
            const folderTr = document.createElement('tr');
            const folderTrLabel = document.createElement('td');
            folderTrLabel.bgColor = "#C8E3FF";
            folderTrLabel.className = "medText";
            folderTrLabel.innerHTML = "<b>Folder:</b>";
            const folderTrContent = document.createElement('td');
            folderTrContent.bgColor = "#F6F6F6";
            folderTrContent.className = "medText";
            folderTrContent.innerHTML = "<a href='/neomessages.phtml?folder=" + OUTBOX_ID + "'><b>Outbox</b></a>";
            folderTr.appendChild(folderTrLabel);
            folderTr.appendChild(folderTrContent);
            tbody.appendChild(folderTr);
            // Subject:
            const subjectTr = document.createElement('tr');
            const subjectTrLabel = document.createElement('td');
            subjectTrLabel.bgColor = "#C8E3FF";
            subjectTrLabel.className = "medText";
            subjectTrLabel.innerHTML = "<b>Subject:</b>";
            const subjectTrContent = document.createElement('td');
            subjectTrContent.bgColor = "#F6F6F6";
            subjectTrContent.className = "medText";
            subjectTrContent.innerHTML = item.subject;
            subjectTr.appendChild(subjectTrLabel);
            subjectTr.appendChild(subjectTrContent);
            tbody.appendChild(subjectTr);
            // In message:
            if (item.isReply) {
                const replyToTr = document.createElement('tr');
                const replyToTrLabel = document.createElement('td');
                replyToTrLabel.bgColor = "#C8E3FF";
                replyToTrLabel.className = "medText";
                const reportLink = `/autoform_abuse.phtml?abuse=report&offender=${item.recipient}&reportType=neomail&extType=neomail&regarding=${item.replyId}&badNeomail=${encodeURIComponent(item.recipientMessageBody)}`;
                replyToTrLabel.innerHTML = "<b>" + item.recipient + " wrote:</b><div align='left' class='sf'><br> [<a href='" + reportLink + "'>Report</a>] [<a href='/neomessages.phtml?type=read_message&folder=Inbox&id=" + item.replyId + "'>Original</a>]</div>";
                const replyToTrContent = document.createElement('td');
                replyToTrContent.bgColor = "#DEDEDE";
                replyToTrContent.className = "medText";
                replyToTrContent.innerHTML = item.recipientMessageBody;
                replyToTr.appendChild(replyToTrLabel);
                replyToTr.appendChild(replyToTrContent);
                tbody.appendChild(replyToTr);
            }
            // Sent message:
            const messageTr = document.createElement('tr');
            const messageTrLabel = document.createElement('td');
            messageTrLabel.bgColor = "#C8E3FF";
            messageTrLabel.className = "medText";
            messageTrLabel.innerHTML = "<br><b>Your message:</b><br>&nbsp;";
            const messageTrContent = document.createElement('td');
            messageTrContent.bgColor = "#FFFFFF";
            messageTrContent.className = "medText";
            messageTrContent.innerHTML = stripHtml(item.messageBody).replace(/\r/g, '').replace(/\n/g, '<br>');
            messageTr.appendChild(messageTrLabel);
            messageTr.appendChild(messageTrContent);
            tbody.appendChild(messageTr);
            return ('<div align="left"><a href="/neomessages.phtml?folder=' + OUTBOX_ID + '">&lt; Back to Outbox</a><br><br></div>' + mainTable.outerHTML);
        } else {
            return ('<div align="left"><a href="/neomessages.phtml?folder=' + OUTBOX_ID + '">&lt; Back to Outbox</a><br><br></div> No sent mail found with ID:' + id);
        }
    }

    function addOutboxLink() {
        const navLinks = Array.from(document.getElementsByClassName('medText')).filter(text => text.tagName === "DIV")[0];
        const outboxLink = navLinks.children[0].cloneNode(true);
        outboxLink.href="/neomessages.phtml?folder=" + OUTBOX_ID;
        outboxLink.children[0].innerHTML = "Outbox";
        const divider = document.createElement('span');
        divider.innerHTML = " | ";
        navLinks.insertBefore(outboxLink, navLinks.childNodes[2]);
        navLinks.insertBefore(divider, navLinks.childNodes[2]);
    }
    addOutboxLink();

    function addSendListener() {
        const sendMailButton = Array.from(document.getElementsByTagName('input')).filter(input => input.value === "Send a NeoMail™")[0];
        if (sendMailButton) {
            sendMailButton.addEventListener('click', () => {
                const id = uuidv4();
                const recipient = Array.from(document.getElementsByTagName('input')).filter(input => input.name === 'recipient')[0].value;
                const subject = Array.from(document.getElementsByTagName('input')).filter(input => input.name === 'subject')[0].value;
                const messageBody = document.getElementById('message_body').value;
                const replyId = urlParams.get('reply_message_id');
                const isReply = replyId !== null;
                const recipientAvatar = isReply ? Array.from(document.getElementsByTagName('input')).filter(input => input.name === 'recipient')[0].parentNode.children[1].src : null;
                const recipientName = isReply ? Array.from(document.getElementsByTagName('input')).filter(input => input.name === 'recipient')[0].parentNode.children[3].children[0].innerHTML : "";
                const recipientMessageBody = isReply && Array.from(document.getElementsByTagName('input')).filter(input => input.name === 'reply_message_id')[0].parentNode.innerHTML.split('\n')[1];
                const timestamp = Date.now();
                sentMessages.push({id, replyId, recipient, subject, messageBody, isReply, recipientAvatar, recipientName, recipientMessageBody, timestamp});
                GM_setValue(NM_ID, sentMessages);
            });
        }
    }

    function updateSentMessagesFor(user) {
        document.getElementById("sentToThisUser")?.remove();
        let messageFormList = Array.from(document.getElementsByTagName("form")).filter(form => form.name === "neomessage");

        if (messageFormList.length > 0) {
            let messageForm = messageFormList[0];
            const userOutbox = document.createElement("div");
            userOutbox.id = "sentToThisUser";
            userOutbox.style.marginTop = "16px";
            userOutbox.innerHTML = "<b>Messages sent to: </b>" + user + "<br/><br/>" + generateAllMailContent(user);
            console.log("this", messageForm.nextSibling, messageForm.parentNode);
            if (messageForm.nextSibling) {
                messageForm.parentNode.insertBefore(userOutbox, messageForm.nextSibling);
            } else {
                messageForm.parentNode.appendChild(userOutbox);
            }
            addOutboxListeners(window.location.href);
        }

    }

    function addRecipientChangeListener() {
        const recipientInput = Array.from(document.getElementsByTagName('input')).filter(input => input.name === 'recipient')[0];
        updateSentMessagesFor(recipientInput.value);
        if (recipientInput.type !== "hidden") {
            recipientInput.addEventListener("input", (e) => {
                updateSentMessagesFor(e.target.value);
            });
        }
    }

})();
